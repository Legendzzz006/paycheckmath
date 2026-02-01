import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4 md:py-5">
        <Link href="/" className="inline-flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-base sm:text-lg font-bold">$</span>
          </div>
          <span className="truncate">PaycheckMath.com</span>
        </Link>
      </div>
    </header>
  );
}
