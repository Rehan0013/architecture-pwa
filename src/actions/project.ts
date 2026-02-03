'use server';

import dbConnect from '@/lib/db';
import Project from '@/lib/models/Project';
import imagekit from '@/lib/imagekit';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Helper to convert File to Buffer for ImageKit
async function fileToBuffer(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    return Buffer.from(arrayBuffer);
}

export type ProjectState = {
    error?: string;
};

export async function createProject(prevState: ProjectState, formData: FormData): Promise<ProjectState> {
    await dbConnect();

    try {
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const location = formData.get('location') as string;
        const year = formData.get('year') as string;

        // Explicit casts to File[] for images is tricky with FormData. 
        // Usually getAll returns Entry[], which can be string or File.
        const imageFiles = formData.getAll('images').filter(file => file instanceof File) as File[];
        const pdfFile = formData.get('pdf') as File;

        const uploadedImages = [];

        // Upload Images
        for (const file of imageFiles) {
            if (file.size > 0) {
                const buffer = await fileToBuffer(file);
                const uploadResponse = await imagekit.upload({
                    file: buffer,
                    fileName: file.name,
                    folder: '/architect_portfolio/projects',
                });
                uploadedImages.push({
                    url: uploadResponse.url,
                    fileId: uploadResponse.fileId,
                });
            }
        }

        let uploadedPdf;
        if (pdfFile && pdfFile.size > 0) {
            const buffer = await fileToBuffer(pdfFile);
            const uploadResponse = await imagekit.upload({
                file: buffer,
                fileName: pdfFile.name,
                folder: '/architect_portfolio/pdfs',
            });
            uploadedPdf = {
                url: uploadResponse.url,
                fileId: uploadResponse.fileId,
            };
        }

        await Project.create({
            title,
            description,
            location,
            year,
            images: uploadedImages,
            pdf: uploadedPdf,
        });

        revalidatePath('/admin/projects');
        revalidatePath('/projects');
        revalidatePath('/');
    } catch (error) {
        console.error('Error creating project:', error);
        return { error: 'Failed to create project.' };
    }

    redirect('/admin/projects');
}

export async function deleteProject(id: string) {
    await dbConnect();

    try {
        const project = await Project.findById(id);
        if (!project) return;

        // Delete images from ImageKit
        for (const img of project.images) {
            await imagekit.deleteFile(img.fileId);
        }

        // Delete PDF from ImageKit
        if (project.pdf) {
            await imagekit.deleteFile(project.pdf.fileId);
        }

        await Project.findByIdAndDelete(id);

        revalidatePath('/admin/projects');
        revalidatePath('/projects');
    } catch (error) {
        console.error('Error deleting project:', error);
    }
}

export async function getProjects() {
    try {
        await dbConnect();
        const projects = await Project.find({}).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(projects));
    } catch (error) {
        console.error('Failed to fetch projects (Mocking empty list for build if DB offline):', error);
        return [];
    }
}

export async function getProject(id: string) {
    try {
        await dbConnect();
        const project = await Project.findById(id);
        if (!project) return null;
        return JSON.parse(JSON.stringify(project));
    } catch (error) {
        console.error('Error fetching project:', error);
        return null;
    }
}

export async function updateProject(id: string, prevState: ProjectState, formData: FormData): Promise<ProjectState> {
    await dbConnect();

    try {
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const location = formData.get('location') as string;
        const year = formData.get('year') as string;

        const project = await Project.findById(id);
        if (!project) return { error: 'Project not found' };

        // Handle Image Uploads (Append)
        const newImageFiles = formData.getAll('new_images').filter(file => file instanceof File && file.size > 0) as File[];
        const uploadedImages = [];

        for (const file of newImageFiles) {
            const buffer = await fileToBuffer(file);
            const uploadResponse = await imagekit.upload({
                file: buffer,
                fileName: file.name,
                folder: '/architect_portfolio/projects',
            });
            uploadedImages.push({
                url: uploadResponse.url,
                fileId: uploadResponse.fileId,
            });
        }

        // Handle PDF Upload
        const newPdfFile = formData.get('new_pdf') as File;
        let uploadedPdf = project.pdf; // Default to existing

        if (newPdfFile && newPdfFile.size > 0) {
            // Delete old PDF if exists
            if (project.pdf) {
                await imagekit.deleteFile(project.pdf.fileId);
            }

            const buffer = await fileToBuffer(newPdfFile);
            const uploadResponse = await imagekit.upload({
                file: buffer,
                fileName: newPdfFile.name,
                folder: '/architect_portfolio/pdfs',
            });
            uploadedPdf = {
                url: uploadResponse.url,
                fileId: uploadResponse.fileId,
            };
        }

        project.title = title;
        project.description = description;
        project.location = location;
        project.year = year;
        if (uploadedImages.length > 0) {
            project.images.push(...uploadedImages);
        }
        project.pdf = uploadedPdf;

        await project.save();

        revalidatePath(`/admin/projects/${id}`);
        revalidatePath('/admin/projects');
        revalidatePath('/projects');
        revalidatePath(`/projects/${id}`);
        revalidatePath('/');

    } catch (error) {
        console.error('Error updating project:', error);
        return { error: 'Failed to update project.' };
    }

    redirect('/admin/projects');
}

export async function deleteProjectImage(projectId: string, fileId: string) {
    await dbConnect();
    try {
        const project = await Project.findById(projectId);
        if (!project) return;

        // Find image to remove
        const imageIndex = project.images.findIndex((img: { fileId: string }) => img.fileId === fileId);
        if (imageIndex > -1) {
            // Delete from ImageKit
            await imagekit.deleteFile(fileId);
            // Remove from DB array
            project.images.splice(imageIndex, 1);
            await project.save();
            revalidatePath(`/admin/projects/${projectId}`); // Revalidate edit page
            revalidatePath(`/projects/${projectId}`);
        }
    } catch (error) {
        console.error('Error deleting project image:', error);
    }
}

export async function deleteProjectPdf(projectId: string, fileId: string) {
    await dbConnect();
    try {
        const project = await Project.findById(projectId);
        if (!project) return;

        if (project.pdf && project.pdf.fileId === fileId) {
            await imagekit.deleteFile(fileId);
            project.pdf = undefined;
            await project.save();
            revalidatePath(`/admin/projects/${projectId}`);
            revalidatePath(`/projects/${projectId}`);
        }
    } catch (error) {
        console.error('Error deleting project PDF:', error);
    }
}
