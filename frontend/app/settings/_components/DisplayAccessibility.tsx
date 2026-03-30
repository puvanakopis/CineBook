'use client';

import { useState } from 'react';
import { MdPalette } from 'react-icons/md';

export function DisplayAccessibility() {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    return (
        <section>
            <div className="flex items-center gap-3 mb-6">
                <MdPalette className="text-primary text-2xl" />
                <h3 className="text-white text-xl font-bold">Display & Accessibility</h3>
            </div>

            <div className="bg-[#291e1e]/30 p-6 rounded-xl border border-[#392828]/50">
                <div className="space-y-6">
                    <div>
                        <h4 className="text-sm font-bold  tracking-wider text-white/80 mb-4">Theme</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setTheme('dark')}
                                className={`rounded-lg p-4 transition-all border ${theme === 'dark'
                                        ? 'border-primary bg-primary/20'
                                        : 'border-[#392828] bg-surface-dim/80'
                                    }`}
                            >
                                <div className="text-xs font-black text-white  tracking-tighter">Cinema Dark</div>
                                <div className="h-1 w-8 bg-primary mt-2" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setTheme('light')}
                                className={`rounded-lg p-4 transition-all border ${theme === 'light'
                                        ? 'border-primary bg-primary/20'
                                        : 'border-[#392828] bg-white/10 opacity-70 grayscale'
                                    }`}
                            >
                                <div className="text-xs font-black text-white/50  tracking-tighter">Classic Light</div>
                                <div className="h-1 w-8 bg-white/20 mt-2" />
                            </button>
                        </div>
                    </div>
                    <p className="text-sm text-text-secondary">Switch themes for better readability and comfort under different lighting conditions.</p>
                </div>
            </div>
        </section>
    );
}