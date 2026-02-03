import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IImage {
    url: string;
    fileId: string;
}

export interface IProject extends Document {
    title: string;
    description: string;
    location: string;
    year: string;
    images: IImage[];
    pdf?: IImage;
    createdAt: Date;
    updatedAt: Date;
}

const ImageSchema = new Schema<IImage>({
    url: { type: String, required: true },
    fileId: { type: String, required: true },
});

const ProjectSchema = new Schema<IProject>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
        year: { type: String, required: true },
        images: [ImageSchema],
        pdf: { type: ImageSchema },
    },
    { timestamps: true }
);

// Prevent overwriting the model if it's already compiled
const Project: Model<IProject> =
    mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
