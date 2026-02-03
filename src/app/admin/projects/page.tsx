import Link from 'next/link';
import { getProjects, deleteProject } from '@/actions/project';
import { IProject } from '@/lib/models/Project';

export default async function AdminProjects() {
    const projects = await getProjects();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-serif">Projects</h1>
                <Link
                    href="/admin/projects/new"
                    className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 text-sm font-medium hover:opacity-80 transition-opacity"
                >
                    New Project
                </Link>
            </div>

            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                {projects.length === 0 ? (
                    <div className="p-8 text-center text-neutral-500">
                        No projects found. Create one to get started.
                    </div>
                ) : (
                    <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
                        {projects.map((project: IProject) => (
                            <li key={String(project._id)} className="p-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                                <div>
                                    <h3 className="font-medium">{project.title}</h3>
                                    <p className="text-sm text-neutral-500">{project.location} — {project.year}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Link href={`/admin/projects/${String(project._id)}`} className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white">Edit</Link>
                                    <form action={deleteProject.bind(null, String(project._id))}>
                                        <button type="submit" className="text-sm text-red-500 hover:text-red-700">Delete</button>
                                    </form>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
