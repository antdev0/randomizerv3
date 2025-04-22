// src/app/api/users/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';  // Import Zod for validation
import prisma from '@services/prismaService';
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

// Define Zod schema for validating request body
const userSchema = z.object({
    username: z.string().min(3, "Username should have at least 3 characters"),
    password: z.string().min(6, "Password should have at least 6 characters")
});

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

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();


        const parsed = userSchema.safeParse(body);

        if (!parsed.success) {

            return NextResponse.json({ message: parsed.error.errors }, { status: 400 });
        }

        // Destructure the validated data
        const { username, password } = parsed.data;

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({ where: { username } });

        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create the new user
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to create user' }, { status: 500 });
    }
}
