import { getProject, updateProject, deleteProjectImage, deleteProjectPdf } from "@/actions/project";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        notFound();
    }

    // update project using server action for better security
    async function updateAction(formData: FormData) {
        'use server';
        await updateProject(id, {}, formData);
    }

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-serif mb-8">Edit Project</h1>

            <form action={updateAction} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Project Title</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={project.title}
                        required
                        className="w-full p-2 border border-neutral-300 dark:border-neutral-700 bg-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        defaultValue={project.location}
                        required
                        className="w-full p-2 border border-neutral-300 dark:border-neutral-700 bg-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Year</label>
                    <input
                        type="text"
                        name="year"
                        defaultValue={project.year}
                        required
                        className="w-full p-2 border border-neutral-300 dark:border-neutral-700 bg-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                        name="description"
                        rows={6}
                        defaultValue={project.description}
                        required
                        className="w-full p-2 border border-neutral-300 dark:border-neutral-700 bg-transparent"
                    ></textarea>
                </div>

                {/* Existing Images Management */}
                <div>
                    <label className="block text-sm font-medium mb-4">Existing Images</label>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {project.images.map((img: { url: string, fileId: string }, index: number) => (
                            <div key={index} className="relative aspect-video bg-neutral-100 dark:bg-neutral-800">
                                <Image
                                    src={img.url}
                                    alt={`Project Image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="50vw"
                                />
                                <button
                                    formAction={async () => {
                                        'use server';
                                        await deleteProjectImage(id, img.fileId);
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-700 z-10"
                                    title="Delete Image"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* New Images Section */}
                <div className="p-4 border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
                    <label className="block text-sm font-medium mb-2">Add New Images</label>
                    <input
                        type="file"
                        name="new_images"
                        accept="image/*"
                        multiple
                        className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-neutral-800"
                    />
                </div>

                {/* PDF Management */}
                <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
                    <label className="block text-sm font-medium mb-2">Project PDF</label>
                    {project.pdf ? (
                        <div className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-800 p-3 mb-4">
                            <a href={project.pdf.url} target="_blank" className="text-sm underline">Current PDF</a>
                            <button
                                formAction={async () => {
                                    'use server';
                                    await deleteProjectPdf(id, project.pdf.fileId);
                                }}
                                className="text-xs text-red-500 hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <div className="text-sm text-neutral-500 mb-4">No PDF uploaded.</div>
                    )}

                    <div className="p-4 border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
                        <label className="block text-sm font-medium mb-2">{project.pdf ? 'Replace PDF' : 'Upload PDF'}</label>
                        <input
                            type="file"
                            name="new_pdf"
                            accept="application/pdf"
                            className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-neutral-800"
                        />
                    </div>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 text-sm font-medium tracking-wide w-full hover:opacity-90 transition-opacity"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
