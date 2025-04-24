import { NextRequest, NextResponse } from 'next/server';
import prisma from '@services/prismaService';



export async function DELETE(request: NextRequest, { params }: { params: Promise<{ prizeId: string }> }) {
    try {

        const { prizeId } = await params;

        const existingPrizeList = await prisma.prize_list.findUnique({
            where: {
                id: prizeId,
            },
        });
        if (!existingPrizeList) {
            return NextResponse.json({ message: 'Prize list not found' }, { status: 404 });
        }

        await prisma.prize_list.delete({
            where: {
                id: prizeId,
            },
        });
        return NextResponse.json({ message: 'Prize list deleted successfully' }, { status: 200 });


    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to delete prize list' }, { status: 500 });
    }
}