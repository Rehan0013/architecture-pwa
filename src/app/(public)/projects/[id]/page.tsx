import { getProjects } from '@/actions/project';
import dbConnect from '@/lib/db';
import Project, { IProject } from '@/lib/models/Project';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const projects = await getProjects();
    return projects.map((project: IProject) => ({
        id: String(project._id),
    }));
}

export const revalidate = 60;

// Helper to fetch directly from DB for the details page if not using the server action which returns everything
async function getProject(id: string) {
    await dbConnect();
    try {
        const project = await Project.findById(id);
        if (!project) return null;
        return JSON.parse(JSON.stringify(project));
    } catch {
        return null;
    }
}

export default async function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        notFound();
    }

    return (
        <div className="bg-white dark:bg-neutral-900 min-h-screen">
            {/* Details Header */}
            <div className="pt-32 pb-12 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <h1 className="text-4xl md:text-7xl font-serif mb-4">{project.title}</h1>
                        <p className="text-neutral-500 text-lg">{project.location} — {project.year}</p>
                    </div>
                    {project.pdf && (
                        <a
                            href={project.pdf.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block border border-black dark:border-white px-6 py-3 text-sm uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                        >
                            Download Project PDF
                        </a>
                    )}
                </div>
            </div>

            {/* Description */}
            <div className="px-6 md:px-12 mb-20 max-w-3xl mx-auto">
                <p className="text-lg leading-relaxed text-neutral-800 dark:text-neutral-300 font-serif">
                    {project.description}
                </p>
            </div>

            {/* Image Gallery */}
            <div className="px-6 md:px-12 pb-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {project.images.map((img: { url: string }, index: number) => (
                        <div
                            key={index}
                            className={`relative w-full aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 overflow-hidden ${index % 3 === 0 ? 'md:col-span-2 md:aspect-[21/9]' : ''
                                }`}
                        >
                            <Image
                                src={img.url}
                                alt={`${project.title} - Image ${index + 1}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Footer */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 py-12 px-6 md:px-12 text-center">
                <Link href="/projects" className="text-sm uppercase tracking-widest hover:opacity-50 transition-opacity">Back to Projects</Link>
            </div>
        </div>
    );
}
