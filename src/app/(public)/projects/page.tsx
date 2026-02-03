import { getProjects } from '@/actions/project';
import { IProject } from '@/lib/models/Project';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 60;

export default async function Projects() {
    const projects = await getProjects();

    return (
        <div className="pt-32 pb-20 px-6 md:px-12 bg-white dark:bg-neutral-900 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-serif mb-4">Projects</h1>
                <p className="text-neutral-500 max-w-lg mb-20">
                    A curated selection of our work across residential, commercial, and cultural sectors.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                    {projects.map((project: IProject, index: number) => (
                        <Link
                            href={`/projects/${String(project._id)}`}
                            key={String(project._id)}
                            className={`group block ${index % 2 === 1 ? 'md:mt-20' : ''}`} // Staggered grid effect
                        >
                            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-6">
                                {project.images && project.images[0] && (
                                    <Image
                                        src={project.images[0].url}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                )}
                            </div>
                            <div className="flex justify-between items-baseline border-b border-neutral-200 dark:border-neutral-800 pb-4 group-hover:border-black dark:group-hover:border-white transition-colors">
                                <h2 className="text-2xl font-serif">{project.title}</h2>
                                <span className="text-sm text-neutral-500">{project.year}</span>
                            </div>
                            <p className="mt-2 text-sm text-neutral-500">{project.location}</p>
                        </Link>
                    ))}

                    {projects.length === 0 && (
                        <div className="col-span-full py-20 text-center text-neutral-500">
                            Portfolio is currently empty.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
