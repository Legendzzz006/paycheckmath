'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DarkModeContextType {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function DarkModeProvider({ children }: { children: ReactNode }) {
    const [darkMode, setDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        try {
            const saved = localStorage.getItem('darkMode');
            if (saved !== null) {
                setDarkMode(saved === 'true');
            } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setDarkMode(true);
            }
        } catch { }
    }, []);

    useEffect(() => {
        if (!mounted) return;
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        try { localStorage.setItem('darkMode', String(darkMode)); } catch { }
    }, [darkMode, mounted]);

    const toggleDarkMode = () => setDarkMode(prev => !prev);

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

export function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (!context) throw new Error('useDarkMode must be used within DarkModeProvider');
    return context;
}
