import Link from 'next/link';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            ...(item.href ? { item: `https://paycheckmath.com${item.href}` } : {}),
        })),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <nav aria-label="Breadcrumb" className="mb-6 no-print">
                <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center gap-1.5">
                            {index > 0 && (
                                <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            )}
                            {item.href && index < items.length - 1 ? (
                                <Link href={item.href} className="hover:text-blue-600 transition-colors">{item.label}</Link>
                            ) : (
                                <span className="text-gray-900 font-medium" aria-current="page">{item.label}</span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}
