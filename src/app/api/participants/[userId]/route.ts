import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';  // Import Zod for validation
import prisma from '@services/prismaService';


const participantSchema = z.object({
    name: z.string().min(3, "Name should have at least 3 characters"),
    company: z.string().min(3, "Company should have at least 3 characters"),
    entries: z.number().min(1, "Entries should be a positive number"),
    type: z.enum(['major', 'minor'], {
        errorMap: () => ({ message: "Type must be either 'major' or 'minor'" }),
      }),
});


export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await params;


        const majorParticipants = await prisma.participant.findMany({
            where: {
                user_id: userId,
                type: 'major',
            }
        })

        const minorParticipants = await prisma.participant.findMany({
            where: {
                user_id: userId,
                type: 'minor',
            }
        })

        const allParticipants = {
            major: majorParticipants,
            minor: minorParticipants,
        };

        // You must return a response
        return NextResponse.json(allParticipants, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to fetch participants' }, { status: 500 });
    }
}


export async function POST(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const body = await request.json();
        const { userId } = await params;

        const parsed = participantSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ message: parsed.error.errors }, { status: 400 });
        }

        // Destructure the validated data
        const { name, company, entries, type } = parsed.data;

        // Check if the user already exists
        const existingParticipant = await prisma.participant.findFirst({
            where: {
                user_id: userId,
                type: type,
                name: name,
                company: company,
            }
        });

        if (existingParticipant) {
            await prisma.participant.update({
                where: {
                    id: existingParticipant.id,
                },
                data: {
                    entries: existingParticipant.entries + entries,
                },
            });
            return NextResponse.json({participantId: existingParticipant.id, newEntry: existingParticipant.entries + entries}, {status: 200});
        }

        // Create the new participant
        const participant = await prisma.participant.create({
            data: {
                name,
                company,
                entries,
                type,
                user_id: userId,
            },
        });

        return NextResponse.json(participant, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to create participant' }, { status: 500 });
    }
}