'use client';

import { useActionState } from 'react';
import { submitContact, ContactState } from '@/actions/contact';
import { useEffect, useRef } from 'react';

const initialState: ContactState = {
    message: '',
    error: '',
    success: false
};

export default function Contact() {
    const [state, formAction, isPending] = useActionState(submitContact, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state?.success && formRef.current) {
            formRef.current.reset();
        }
    }, [state?.success]);

    return (
        <div className="pt-32 pb-20 px-6 md:px-12 min-h-screen bg-neutral-900 text-white">
            <div className="max-w-2xl mx-auto">
                <span className="text-xs uppercase tracking-widest text-neutral-500 block mb-6">Get in Touch</span>
                <h1 className="text-4xl md:text-6xl font-serif mb-12">Let's build something timeless.</h1>

                <form ref={formRef} action={formAction} className="space-y-8">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-neutral-500">Name</label>
                                <input type="text" name="name" required className="w-full bg-transparent border-b border-neutral-700 py-2 focus:border-white outline-none transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-neutral-500">Email</label>
                                <input type="email" name="email" required className="w-full bg-transparent border-b border-neutral-700 py-2 focus:border-white outline-none transition-colors" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-neutral-500">Subject</label>
                        <input type="text" name="subject" className="w-full bg-transparent border-b border-neutral-700 py-2 focus:border-white outline-none transition-colors" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-neutral-500">Message</label>
                        <textarea name="message" rows={6} required className="w-full bg-transparent border-b border-neutral-700 py-2 focus:border-white outline-none transition-colors resize-none"></textarea>
                    </div>

                    {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
                    {state?.success && <p className="text-green-500 text-sm">Thank you. We will be in touch shortly.</p>}

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="text-sm uppercase tracking-widest border-b border-white pb-1 hover:opacity-50 transition-opacity disabled:opacity-50"
                        >
                            {isPending ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </form>

                <div className="mt-20 pt-12 border-t border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-neutral-400">
                    <div>
                        <h4 className="text-white uppercase tracking-widest text-xs mb-4">Visit Us</h4>
                        <p>123 Architecture Blvd</p>
                        <p>Design District, NY 10012</p>
                    </div>
                    <div>
                        <h4 className="text-white uppercase tracking-widest text-xs mb-4">Contact</h4>
                        <p>hello@architect.studio</p>
                        <p>+1 (555) 123-4567</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
