'use client';

import { MdCancel, MdSave } from 'react-icons/md';

interface SettingsActionsProps {
    onSave: () => void;
    onDiscard: () => void;
}

export function SettingsActions({ onSave, onDiscard }: SettingsActionsProps) {
    return (
        <section>

            <div className=" p-6">
                <div className="flex flex-wrap items-center justify-end gap-4">
                    <button
                        onClick={onDiscard}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#1e1616] text-white/70 font-bold rounded-lg border border-[#392828] hover:bg-[#392828] hover:text-white transition-all  tracking-widest text-xs"
                    >
                        <MdCancel />
                        Discard
                    </button>
                    <button
                        onClick={onSave}
                        className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-lg shadow-lg active:scale-95 transition-transform  tracking-widest text-xs"
                    >
                        <MdSave />
                        Save
                    </button>
                </div>
            </div>
        </section>
    );
}