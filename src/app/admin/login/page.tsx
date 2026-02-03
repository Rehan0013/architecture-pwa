'use client';

import { useActionState } from 'react';
import { loginAdmin, AuthState } from '@/actions/auth';

const initialState: AuthState = {
    error: '',
};

export default function AdminLogin() {
    const [state, formAction, isPending] = useActionState(loginAdmin, initialState);

    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-900 px-4">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl font-serif text-center mb-8 text-neutral-800 dark:text-neutral-200">
                    Studio Admin
                </h1>
                <form action={formAction} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Access Key"
                            required
                            className="w-full px-4 py-3 bg-transparent border-b border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white outline-none transition-colors text-center placeholder:text-neutral-400 font-sans"
                        />
                    </div>

                    {state?.error && (
                        <p className="text-red-500 text-sm text-center">{state.error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-3 bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity font-medium tracking-wide disabled:opacity-50"
                    >
                        {isPending ? 'Authenticating...' : 'Enter'}
                    </button>
                </form>
            </div>
        </div>
    );
}
