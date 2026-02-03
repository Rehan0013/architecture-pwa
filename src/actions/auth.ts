'use server';

import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SECRET_KEY = process.env.ADMIN_SECRET || 'eb943c53907b58a860dc9f904312qwas';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const key = new TextEncoder().encode(SECRET_KEY);

export type AuthState = {
    error?: string;
};

export async function loginAdmin(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const password = formData.get('password') as string;

    if (password !== ADMIN_PASSWORD) {
        return { error: 'Invalid password' };
    }

    // Create JWT
    const token = await new SignJWT({ role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h') // Session lasts 24 hours
        .sign(key);

    const cookieStore = await cookies();
    cookieStore.set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
    });

    redirect('/admin');
}

export async function logoutAdmin() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect('/admin/login');
}
