import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@services/prismaService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyToken } from '@utils/verifyToken';

// Define env var in `.env` (e.g., JWT_SECRET=your-secret-key)
const JWT_SECRET = process.env.JWT_SECRET as string;

const userSchema = z.object({
    username: z.string({ required_error: "Username is required" }).nonempty("Username is required"),
    password: z.string({ required_error: "Password is required" }).nonempty("Password is required"),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsed = userSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ message: parsed.error.errors }, { status: 400 });
        }

        const { username, password } = parsed.data;

        // Check if the user exists
        const existingUser = await prisma.user.findUnique({ where: { username } });

        if (!existingUser) {
            return NextResponse.json({ message: 'User does not exist' }, { status: 400 });
        }

        // Check the password
        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            return NextResponse.json({ message: 'Invalid password' }, { status: 400 });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: existingUser.id, username: existingUser.username },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to authenticate user' }, { status: 500 });
    }
}


export async function GET(request: NextRequest) {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const { valid, decoded } = verifyToken(token);

    if (!valid) {
        return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
    }


    return NextResponse.json({ message: 'Access granted', user: decoded }, { status: 200 });
}
