import { NextResponse } from 'next/server';
import prisma from '@services/prismaService';


export async function GET() {
    try {
        const users = await prisma.user.findMany({
            select: {
                username: true,
            },
        });
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
    }
}