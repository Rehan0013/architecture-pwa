'use server';

import dbConnect from '@/lib/db';
import Message from '@/lib/models/Message';
import { sendEmail } from '@/lib/nodemailer';

export type ContactState = {
    success?: boolean;
    message?: string;
    error?: string;
};

export async function submitContact(prevState: ContactState, formData: FormData): Promise<ContactState> {
    await dbConnect();

    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;

        // 1. Save to Database
        await Message.create({
            name,
            email,
            subject,
            message,
        });

        // 2. Send Admin Notification
        const adminHtml = `
      <h2>New Website Inquiry</h2>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

        if (process.env.SMTP_ADMIN_EMAIL) {
            await sendEmail({
                to: process.env.SMTP_ADMIN_EMAIL,
                subject: `New Inquiry: ${subject}`,
                html: adminHtml,
            });
        }

        // 3. Send User Confirmation
        const userHtml = `
      <div style="font-family: sans-serif; color: #333;">
        <h2>Thank you for contacting Architect.</h2>
        <p>We have received your message and will review it shortly.</p>
        <br/>
        <p>Best regards,</p>
        <p>The Architect Studio Team</p>
      </div>
    `;

        await sendEmail({
            to: email,
            subject: 'Inquiry Received - Architect Studio',
            html: userHtml,
        });

        return { success: true, message: 'Message sent successfully.' };

    } catch (error) {
        console.error('Error submitting contact form:', error);
        return { error: 'Failed to send message. Please try again later.' };
    }
}
