import Image from 'next/image';

export default function About() {
    return (
        <div className="pt-32 pb-20 px-6 md:px-12 min-h-screen bg-neutral-50 dark:bg-neutral-900">
            <div className="max-w-5xl mx-auto">
                <span className="text-xs uppercase tracking-widest text-neutral-500 block mb-6">The Studio</span>
                <h1 className="text-4xl md:text-6xl font-serif mb-12 leading-tight">
                    We craft spaces that honor context, celebrate light, and elevate the human experience.
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 space-y-6">
                        <p>
                            Founded in 2024, Architect Studio operates at the intersection of art, technology, and sustainability. We believe that every project is an opportunity to tell a unique story—one that is deeply rooted in its environment and responsive to the needs of its inhabitants.
                        </p>
                        <p>
                            Our approach is reductive yet warm, focusing on the essential qualities of space: proportion, light, and material. We shun trends in favor of timelessness, creating architecture that ages gracefully and endures.
                        </p>
                    </div>
                    <div className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 space-y-6">
                        <p>
                            We work closely with clients to understand their vision, translating abstract concepts into tangible realities. From private residences to cultural institutions, our portfolio reflects a commitment to excellence and a passion for detail.
                        </p>
                        <div className="pt-4">
                            <h3 className="text-black dark:text-white font-serif text-xl mb-4">Our Services</h3>
                            <ul className="space-y-2 text-sm uppercase tracking-widest">
                                <li>Architectural Design</li>
                                <li>Interior Design</li>
                                <li>Landscape Planning</li>
                                <li>Sustainable Consulting</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Team / Image Section */}
                <div className="relative aspect-[16/9] w-full bg-neutral-200 dark:bg-neutral-800 mb-12">
                    {/* Placeholder for studio image */}
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                        <span className="uppercase tracking-widest text-sm">[Studio Environment Image]</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
