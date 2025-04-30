import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@services/prismaService';

const winnerSchema = z.object({
    type: z.enum(['major', 'minor'], {
        errorMap: () => ({ message: "Type must be either 'major' or 'minor'" }),
    }),
    participant_id: z.string().min(1, "Participant ID is required"),
    prize_list_id: z.string().min(1, "Price List ID is required"),

});


export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await params;

        const userInfo = await prisma.user.findMany({ where: { id: userId } });

        if (!userInfo) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }


        const winners = await prisma.winner.findMany({
            where: {
                user_id: userId,
                type: {
                    in: ['major', 'minor'],
                },
            },
            select: {
                id: true,
                name: true,
                company: true,
                type: true,
                prize_list_id: true,
                user_id: true,
                prize_list: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
          
        });

        const allWinners = {
            major: winners.filter(w => w.type === 'major'),
            minor: winners.filter(w => w.type === 'minor'),
        };

        return NextResponse.json(allWinners, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to fetch winners' }, { status: 500 });
    }
}




export async function POST(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const over_all_chance_to_be_selected = 1;
        const chance_to_be_selected_in_major = 1;
        const chance_to_be_selected_in_minor = 1;

        const body = await request.json();
        const { userId } = await params;

        const parsed = winnerSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ message: parsed.error.errors }, { status: 400 });
        }

        const { type, participant_id, prize_list_id } = parsed.data;

        const result = await prisma.$transaction(async (tx) => {
            // Step 1: Record the winner first
            const participant = await tx.participant.findUnique({ where: { id: participant_id } });

            if (!participant) {
                throw new Error('Participant not found');
            }

            const { name, company } = participant;

            // Record the winner
            const winner = await tx.winner.create({
                data: {
                    type,
                    prize_list_id,
                    user_id: userId,
                    name,
                    company,
                }
            });

            const existingPrizeList = await tx.prize_list.findFirst({
                where: { id: prize_list_id }
            });

            if (!existingPrizeList) {
                throw new Error('Prize list not found');
            }

            if (existingPrizeList) {
                await tx.prize_list.update({
                    where: { id: existingPrizeList.id },
                    data: {
                        quantity: existingPrizeList.quantity - 1,
                    },
                });
            }

            // Step 2: Count how many wins this participant has
            const totalCount = await tx.winner.count({
                where: { name, company, user_id: userId },
            });

            // Step 3: Check overall limit
            if (totalCount >= over_all_chance_to_be_selected) {
                await tx.participant.updateMany({
                    where: { name, company, user_id: userId },
                    data: { entries: 0 },
                });

                return {
                    status: 'overall_limit_reached',
                    name,
                    company,
                };
            }

            // Step 4: Check type-specific limit (major/minor)
            const typeCount = await tx.winner.count({
                where: { name, company, user_id: userId, type },
            });

            const typeLimit =
                type === 'major' ? chance_to_be_selected_in_major : chance_to_be_selected_in_minor;

            if (typeCount >= typeLimit) {
                await tx.participant.update({
                    where: { id: participant_id },
                    data: { entries: 0 },
                });

                return {
                    status: 'type_limit_reached',
                    participant_id,
                    type,
                };
            }

            // Step 5: Success if no limits reached
            return { status: 'success', winner };
        });

        // Now handle what was returned
        if (result.status === 'overall_limit_reached') {
            return NextResponse.json(
                {
                    message: 'Participant reached overall limit. Entries set to 0 for all records.',
                    name: result.name,
                    company: result.company,
                    entries: 0,
                    type: "all",
                    status: "reached"
                },
                { status: 200 }
            );
        }

        if (result.status === 'type_limit_reached') {
            return NextResponse.json(
                {
                    message: `Participant reached ${result.type} limit. Entry set to 0.`,
                    participant_id: result.participant_id,
                    type: result.type,
                    entries: 0,
                    status: "reached"
                },
                { status: 200 }
            );
        }

        // If success
        return NextResponse.json(result.winner, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to create winner' }, { status: 500 });
    }
}
