import Link from 'next/link';
import { getProjects } from '@/actions/project';
import { IProject } from '@/lib/models/Project';
import Image from 'next/image';
import ParallaxSection from '@/components/ParallaxSection';

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  const allProjects = await getProjects();
  const featuredProjects = allProjects.slice(0, 3);

  // Modern Architectural Images (Unsplash High Quality)
  const heroImage = "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2940&auto=format&fit=crop";
  const philosophyImage = "https://images.unsplash.com/photo-1518005052357-e98475017296?q=80&w=2848&auto=format&fit=crop";
  const sustainabilityImage = "https://images.unsplash.com/photo-1518005052357-e98475017296?q=80&w=2848&auto=format&fit=crop";

  return (
    <>
      {/* 1. Hero Section (Parallax) */}
      <ParallaxSection
        imageUrl={heroImage}
        imageAlt="Modern concrete architecture"
        overlayOpacity={0.3}
      >
        <div className="text-center space-y-8 text-white">
          <h1 className="text-6xl md:text-9xl font-serif font-light tracking-tight leading-tight">
            Design <br /> for Impact.
          </h1>
          <p className="text-sm md:text-base uppercase tracking-[0.2em] text-neutral-200 max-w-md mx-auto">
            A multidisciplinary architecture and design studio creating timeless spaces.
          </p>
        </div>
      </ParallaxSection>

      {/* 2. Philosophy Introduction (Clean Text) */}
      <section className="py-32 px-6 md:px-12 bg-white dark:bg-neutral-900">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-start">
          <div className="md:w-1/3">
            <span className="text-xs uppercase tracking-widest text-neutral-500 block mb-6 border-l-2 border-black dark:border-white pl-4">The Studio</span>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-5xl font-serif leading-tight text-neutral-800 dark:text-neutral-100 mb-8">
              We believe architecture is more than shelter. It is the stage for life, a catalyst for connection, and a legacy for the future.
            </h2>
            <div className="flex gap-4">
              <Link href="/about" className="inline-block border border-black dark:border-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                Read Philosophy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Projects (Grid) */}
      <section className="py-32 px-6 md:px-12 bg-neutral-50 dark:bg-black">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex justify-between items-end mb-20 px-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-neutral-500 block mb-2">Portfolio</span>
              <h2 className="text-4xl md:text-6xl font-serif">Selected Works</h2>
            </div>
            <Link href="/projects" className="hidden md:block text-sm uppercase tracking-widest hover:underline underline-offset-4">
              View All Projects
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project: IProject, i: number) => (
              <Link
                href={`/projects/${String(project._id)}`}
                key={String(project._id)}
                className={`group block relative ${i === 1 ? 'lg:translate-y-20' : ''}`} // Stagger effect
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200 dark:bg-neutral-800 mb-4">
                  {project.images && project.images[0] && (
                    <Image
                      src={project.images[0].url}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                </div>
                <div className="px-2">
                  <h3 className="text-xl font-serif mb-1 group-hover:underline decoration-1 underline-offset-4">{project.title}</h3>
                  <p className="text-sm text-neutral-500 uppercase tracking-wide">{project.location} — {project.year}</p>
                </div>
              </Link>
            ))}
            {featuredProjects.length === 0 && (
              <div className="col-span-full py-20 text-center text-neutral-500">
                No projects published yet.
              </div>
            )}
          </div>

          <div className="mt-24 text-center md:hidden">
            <Link href="/projects" className="text-sm uppercase tracking-widest border-b border-current pb-1">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Process / Sustainability (Parallax) */}
      <ParallaxSection
        imageUrl="https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=2864&auto=format&fit=crop"
        imageAlt="Green building details"
        overlayOpacity={0.6}
        heightClass="h-[80vh]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto text-white items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">Designed for <br /> Tomorrow.</h2>
          </div>
          <div className="space-y-6 text-lg text-neutral-300 leading-relaxed border-l border-white/30 pl-8">
            <p>
              Sustainability is not an afterthought; it is the foundation of our practice. We strive to create buildings that minimize their environmental footprint while maximizing occupant well-being.
            </p>
            <p>
              From passive design strategies to material lifecycle analysis, every decision is guided by a commitment to the planet and future generations.
            </p>
          </div>
        </div>
      </ParallaxSection>

      {/* 5. Contact CTA */}
      <section className="py-32 px-6 md:px-12 bg-white dark:bg-neutral-900 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-7xl font-serif leading-tight">Have a vision in mind?</h2>
          <p className="text-neutral-500 text-lg">Let's discuss your next project.</p>
          <div className="pt-8">
            <Link href="/contact" className="inline-block bg-black dark:bg-white text-white dark:text-black px-12 py-4 text-sm uppercase tracking-widest hover:opacity-80 transition-opacity">
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
