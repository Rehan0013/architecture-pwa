'use server';

import dbConnect from '@/lib/db';
import Message from '@/lib/models/Message';
import { revalidatePath } from 'next/cache';

export async function getMessages() {
    await dbConnect();
    try {
        const messages = await Message.find({}).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(messages));
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
}

export async function deleteMessage(id: string) {
    await dbConnect();
    try {
        await Message.findByIdAndDelete(id);
        revalidatePath('/admin/messages');
    } catch (error) {
        console.error('Error deleting message:', error);
    }
}
