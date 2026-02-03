import { logoutAdmin } from '@/actions/auth';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`min-h-screen flex bg-neutral-50 dark:bg-neutral-900 ${inter.className}`}>
            {/* Sidebar */}
            <aside className="w-64 border-r border-neutral-200 dark:border-neutral-800 hidden md:flex flex-col p-6 fixed h-full bg-neutral-50 dark:bg-neutral-900 z-10">
                <div className="mb-10">
                    <h2 className="text-xl font-serif font-bold tracking-tight">Admin</h2>
                </div>

                <nav className="flex-1 space-y-4 font-medium text-sm text-neutral-600 dark:text-neutral-400">
                    <Link href="/admin" className="block hover:text-black dark:hover:text-white transition-colors">
                        Dashboard
                    </Link>
                    <Link href="/admin/projects" className="block hover:text-black dark:hover:text-white transition-colors">
                        Projects
                    </Link>
                    <Link href="/admin/messages" className="block hover:text-black dark:hover:text-white transition-colors">
                        Messages
                    </Link>
                </nav>

                <div>
                    <form action={logoutAdmin}>
                        <button type="submit" className="text-sm text-red-500 hover:text-red-600 transition-colors">
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                <div className="max-w-4xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
