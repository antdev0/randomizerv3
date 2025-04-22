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


export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
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

export async function POST(request: NextRequest, { params }: { params: { userId: string } }) {
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

        // ✅ 1. Record the winner first
        const winner = await prisma.winner.create({
            data: {
                type,
                participant_id,
                prize_list_id,
                user_id: userId,
            },
        });

        // ✅ 2. Count total wins for this participant
        const totalCount = await prisma.winner.count({
            where: {
                participant_id,
                user_id: userId,
            },
        });

        // ✅ 3. If reached max overall, set entries to 0
        if (totalCount >= over_all_chance_to_be_selected) {
            await prisma.participant.update({
                where: { id: participant_id },
                data: { entries: 0 },
            });
            return NextResponse.json(
                {
                    message: 'Participant reached overall limit. Entry set to 0.',
                    participant_id: participant_id,
                    entries: 0,
                    type: "all"
                },
                { status: 200 });
        }

        // ✅ 4. Check type-specific count
        const typeCount = await prisma.winner.count({
            where: {
                participant_id,
                user_id: userId,

                type,
            },
        });

        const typeLimit =
            type === 'major' ? chance_to_be_selected_in_major : chance_to_be_selected_in_minor;

        if (typeCount >= typeLimit) {
            await prisma.participant.update({
                where: { id: participant_id },
                data: { entries: 0 },
            });
            return NextResponse.json(
                {
                    message: `Participant reached ${type} limit. Entry set to 0.`,
                    participant_id: participant_id,
                    type: type,
                    entries: 0,
                },
                { status: 200 });
        }

        return NextResponse.json(winner, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to create winner' }, { status: 500 });
    }
}