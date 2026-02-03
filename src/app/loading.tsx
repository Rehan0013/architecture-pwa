export default function Loading() {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white dark:bg-neutral-900">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-neutral-200 dark:border-neutral-800 border-t-black dark:border-t-white rounded-full animate-spin"></div>
                <p className="mt-4 text-xs uppercase tracking-widest text-neutral-500 animate-pulse">Loading Studio</p>
            </div>
        </div>
    );
}
