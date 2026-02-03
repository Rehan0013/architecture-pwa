'use client';

import { useActionState } from 'react';
import { createProject, ProjectState } from '@/actions/project';

const initialState: ProjectState = {
    error: '',
};

export default function NewProject() {
    const [state, formAction, isPending] = useActionState(createProject, initialState);

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-serif mb-2">New Project</h1>
                <p className="text-neutral-500 text-sm">Upload details and assets for a new portfolio entry.</p>
            </div>

            <form action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <input type="text" name="title" required className="w-full px-4 py-2 bg-transparent border border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <input type="text" name="location" required className="w-full px-4 py-2 bg-transparent border border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white outline-none" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Year</label>
                        <input type="text" name="year" required className="w-full px-4 py-2 bg-transparent border border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white outline-none" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea name="description" rows={5} required className="w-full px-4 py-2 bg-transparent border border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white outline-none resize-none"></textarea>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Images (Select multiple)</label>
                    <input type="file" name="images" multiple accept="image/*" required className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-neutral-100 dark:file:bg-neutral-800 hover:file:bg-neutral-200" />
                    <p className="text-xs text-neutral-400">First image will be the cover.</p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Project PDF (Optional)</label>
                    <input type="file" name="pdf" accept="application/pdf" className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-neutral-100 dark:file:bg-neutral-800 hover:file:bg-neutral-200" />
                </div>

                {state?.error && (
                    <p className="text-red-500 text-sm">{state.error}</p>
                )}

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 text-sm font-medium hover:opacity-80 transition-opacity w-full md:w-auto disabled:opacity-50"
                    >
                        {isPending ? 'Creating Project...' : 'Create Project'}
                    </button>
                </div>
            </form>
        </div>
    );
}
