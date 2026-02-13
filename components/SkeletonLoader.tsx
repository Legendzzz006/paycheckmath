export default function SkeletonLoader() {
    return (
        <div className="calculator-card border border-gray-200 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg" aria-busy="true" aria-label="Loading calculator">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 skeleton" />
                <div className="h-7 w-48 skeleton" />
            </div>
            <div className="space-y-5">
                <div><div className="h-4 w-24 skeleton mb-2" /><div className="h-12 w-full skeleton" /></div>
                <div className="grid grid-cols-2 gap-4">
                    <div><div className="h-4 w-28 skeleton mb-2" /><div className="h-12 w-full skeleton" /></div>
                    <div><div className="h-4 w-28 skeleton mb-2" /><div className="h-12 w-full skeleton" /></div>
                </div>
                <div><div className="h-4 w-36 skeleton mb-2" /><div className="h-12 w-full skeleton" /></div>
            </div>
            <div className="mt-8 pt-8 border-t-2 border-gray-100">
                <div className="h-6 w-40 skeleton mb-6" />
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="h-24 skeleton" />
                    <div className="h-24 skeleton" />
                    <div className="h-24 skeleton" />
                    <div className="h-24 skeleton" />
                </div>
            </div>
        </div>
    );
}
