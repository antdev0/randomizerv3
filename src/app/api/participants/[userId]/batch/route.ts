import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';  // Import Zod for validation
import prisma from '@services/prismaService';


const batchSchema = z.object({
    participants: z.array(z.object({
        name: z.string().min(3, "Name should have at least 3 characters"),
        company: z.string().min(3, "Company should have at least 3 characters"),
        entries: z.number().min(1, "Entries should be a positive number"),
        type: z.enum(['major', 'minor'], {
            errorMap: () => ({ message: "Type must be either 'major' or 'minor'" }),
        }),
    })),
});

export async function POST(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const body = await request.json();
        const { userId } = await params;

        const parsed = batchSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ message: parsed.error.errors }, { status: 400 });
        }

        const { participants } = parsed.data;

        await Promise.all(participants.map(async (participant) => {
            const existing = await prisma.participant.findFirst({
                where: {
                    name: participant.name,
                    company: participant.company,
                    type: participant.type,
                    user_id: userId,
                },
            });

            if (existing) {
                await prisma.participant.update({
                    where: { id: existing.id },
                    data: {
                        entries: existing.entries + participant.entries,
                    },
                });
            } else {
                await prisma.participant.create({
                    data: {
                        name: participant.name,
                        company: participant.company,
                        entries: participant.entries,
                        type: participant.type,
                        user_id: userId,
                    },
                });
            }
        }));

        return NextResponse.json({ message: 'Participants added successfully' }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to create participant' }, { status: 500 });
    }
}