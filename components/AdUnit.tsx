'use client';
import { useEffect, useRef } from 'react';

interface AdUnitProps {
    slot?: string;
    format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
    className?: string;
}

export default function AdUnit({ slot = '', format = 'auto', className = '' }: AdUnitProps) {
    const adRef = useRef<HTMLDivElement>(null);
    const pushed = useRef(false);

    useEffect(() => {
        if (pushed.current) return;
        try {
            if (typeof window !== 'undefined' && (window as any).adsbygoogle && adRef.current) {
                (window as any).adsbygoogle.push({});
                pushed.current = true;
            }
        } catch { }
    }, []);

    const layoutStyle: Record<string, string> = {
        horizontal: 'min-h-[90px]',
        vertical: 'min-h-[250px]',
        rectangle: 'min-h-[250px] max-w-[336px]',
        auto: 'min-h-[100px]',
    };

    return (
        <div className={`w-full flex justify-center my-6 no-print ${className}`} ref={adRef}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', width: '100%' }}
                data-ad-client="ca-pub-8628108609340604"
                data-ad-slot={slot}
                data-ad-format={format === 'auto' ? 'auto' : undefined}
                data-full-width-responsive="true"
            />
            {/* Fallback placeholder when ads aren't loaded */}
            <div className={`w-full bg-gray-50 border border-dashed border-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400 ${layoutStyle[format]}`} style={{ display: 'none' }}>
                Advertisement
            </div>
        </div>
    );
}
