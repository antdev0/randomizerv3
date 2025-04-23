import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod'; 
import prisma from '@services/prismaService';


const prizeListSchema = z.object({
    name: z.string().min(3, "Name should have at least 3 characters"),
    type: z.enum(['major', 'minor'], {
        errorMap: () => ({ message: "Type must be either 'major' or 'minor'" }),
      }),
    image: z.string().min(3, "Image should have at least 3 characters"),
    quantity: z.number().min(1, "Quantity should be a positive number"),
});


export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> } ) {
    try {
        const { userId } = await params;

        const prizeLists = await prisma.prize_list.findMany({
            where: {
                user_id: userId,
                type: {
                    in: ['major', 'minor'],
                },
            },
        });

        const allPrizeLists = {
            major: prizeLists.filter(prize => prize.type === 'major'),
            minor: prizeLists.filter(prize => prize.type === 'minor'),
        };

        return NextResponse.json(allPrizeLists, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to fetch price lists' }, { status: 500 });
    }
}


export async function POST(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const body = await request.json();
        const { userId } = await params;

        const parsed = prizeListSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ message: parsed.error.errors }, { status: 400 });
        }

        // Destructure the validated data
        const { name, type, image, quantity } = parsed.data;

        // Check if the user already exists
        const existingPrizeList = await prisma.prize_list.findFirst({
            where: {
                user_id: userId,
                type: type,
                name: name,
            }
        });

        if (existingPrizeList) {
            await prisma.prize_list.update({
                where: {
                    id: existingPrizeList.id,
                },
                data: {
                    quantity: existingPrizeList.quantity + quantity,
                },
            });
            return NextResponse.json({newQuantity: existingPrizeList.quantity + quantity}, {status: 200});
        }

        // Create the new price list
        const priceList = await prisma.prize_list.create({
            data: {
                name,
                type,
                image,
                quantity,
                user_id: userId,
            },
        });

        return NextResponse.json(priceList, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to create price list' }, { status: 500 });
    }
}