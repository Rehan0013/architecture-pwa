import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-neutral-900 text-white py-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-2xl font-serif mb-6">Architect.</h2>
                    <p className="text-neutral-400 max-w-sm">
                        Creating spaces that inspire, endure, and connect. A multidisciplinary studio focused on sustainable and timeless design.
                    </p>
                </div>

                <div>
                    <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-6 font-bold">Sitemap</h3>
                    <ul className="space-y-4 text-sm text-neutral-300">
                        <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                        <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
                        <li><Link href="/about" className="hover:text-white transition-colors">Studio</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-6 font-bold">Social</h3>
                    <ul className="space-y-4 text-sm text-neutral-300">
                        <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Pinterest</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between text-xs text-neutral-500">
                <p>&copy; {currentYear} Architect Studio. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <Link href="/admin/login" className="hover:text-neutral-700 transition-colors">Admin</Link>
                </div>
            </div>
        </footer>
    );
}
