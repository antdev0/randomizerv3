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

        const winners = await prisma.winner.findMany({
            where: {
                user_id: userId,
                type: {
                    in: ['major', 'minor'],
                },
            },
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

        // Step 1: Record the winner first
        const participant = await prisma.participant.findUnique({ where: { id: participant_id } });

        if (!participant) {
            return NextResponse.json({ message: 'Participant not found' }, { status: 404 });
        }

        const { name, company } = participant;

        // Record the winner first
        const winner = await prisma.winner.create({
            data: {
                type,
                prize_list_id,
                user_id: userId,
                name,
                company,
            }
        });

        // Step 2: Count how many wins this participant (name+company) has
        const totalCount = await prisma.winner.count({
            where: { name, company, user_id: userId },
        });

        // Step 3: Check if they reached the overall limit
        if (totalCount > over_all_chance_to_be_selected) {
            // Disqualify this participant by setting all their entries to 0
            await prisma.participant.updateMany({
                where: { name, company, user_id: userId },
                data: { entries: 0 },
            });

            return NextResponse.json(
                {
                    message: 'Participant reached overall limit. Entries set to 0 for all records.',
                    name,
                    company,
                    entries: 0,
                    type: "all",
                    status: "reached"
                },
                { status: 200 }
            );
        }

        // Step 4: Check if they reached the type-specific limit (major/minor)
        const typeCount = await prisma.winner.count({
            where: {
                name,
                company,
                user_id: userId,
                type,
            },
        });

        const typeLimit =
            type === 'major' ? chance_to_be_selected_in_major : chance_to_be_selected_in_minor;

        if (typeCount > typeLimit) {
            // Disqualify this participant for the current type only by setting their entries to 0
            await prisma.participant.update({
                where: { id: participant_id },
                data: { entries: 0 },
            });

            return NextResponse.json(
                {
                    message: `Participant reached ${type} limit. Entry set to 0.`,
                    participant_id,
                    type,
                    entries: 0,
                    status: "reached"
                },
                { status: 200 }
            );
        }

        // Step 5: Return success response if no limit was reached
        return NextResponse.json(winner, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to create winner' }, { status: 500 });
    }
}
