import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif font-light mb-2">Dashboard</h1>
                <p className="text-neutral-500">Welcome back to the studio control center.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/admin/projects" className="group block p-6 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-black dark:hover:border-white transition-colors">
                    <h3 className="text-lg font-medium mb-2 group-hover:underline decoration-1 underline-offset-4">Manage Projects</h3>
                    <p className="text-neutral-500 text-sm">Add, edit, or remove portfolio projects.</p>
                </Link>

                <Link href="/admin/messages" className="group block p-6 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-black dark:hover:border-white transition-colors">
                    <h3 className="text-lg font-medium mb-2 group-hover:underline decoration-1 underline-offset-4">Inquiries</h3>
                    <p className="text-neutral-500 text-sm">View messages from the contact form.</p>
                </Link>
            </div>
        </div>
    );
}
