'use client';

import { IoChevronDown, IoSettingsOutline } from "react-icons/io5";
import { useState, useEffect } from "react";

const genres = ["Action", "Comedy", "Sci-Fi", "Horror", "Drama", "Thriller", "Romance", "Animation"];

interface PreferencesData {
    theme: string;
    notifications: boolean;
    favoriteGenres: string[];
    preferredCinema: string;
}

interface PreferencesSectionProps {
    preferences?: PreferencesData;
    onUpdate?: (data: PreferencesData) => void;
}

export function PreferencesSection({ preferences, onUpdate }: PreferencesSectionProps) {
    const [localPreferences, setLocalPreferences] = useState<PreferencesData>({
        theme: "dark",
        notifications: true,
        favoriteGenres: [],
        preferredCinema: "CineMax Downtown",
    });

    useEffect(() => {
        if (preferences) {
            setLocalPreferences(preferences);
        }
    }, [preferences]);

    const toggleGenre = (genre: string) => {
        setLocalPreferences(prev => ({
            ...prev,
            favoriteGenres: prev.favoriteGenres.includes(genre)
                ? prev.favoriteGenres.filter(g => g !== genre)
                : [...prev.favoriteGenres, genre]
        }));
    };

    const handleCinemaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLocalPreferences(prev => ({ ...prev, preferredCinema: e.target.value }));
    };

    const toggleNotification = () => {
        setLocalPreferences(prev => ({ ...prev, notifications: !prev.notifications }));
    };

    const handleSave = () => {
        if (onUpdate) {
            onUpdate(localPreferences);
        }
    };

    return (
        <section>
            <div className="flex items-center gap-3 mb-8">
                <IoSettingsOutline className="text-primary text-xl" />
                <h2 className="text-xl font-bold text-white tracking-wider">
                    Preferences
                </h2>
            </div>

            <div className="bg-[#1a1414] p-8 rounded-xl border border-[#392828] shadow-2xl space-y-8">
                {/* Genres */}
                <div className="p-5 rounded-xl bg-surface-dark border border-[#392828]">
                    <h4 className="text-white font-semibold text-sm tracking-wide mb-4">
                        Favorite Genres
                    </h4>
                    <div className="flex flex-wrap gap-3">
                        {genres.map((genre) => {
                            const isSelected = localPreferences.favoriteGenres.includes(genre);
                            return (
                                <button
                                    key={genre}
                                    onClick={() => toggleGenre(genre)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isSelected
                                            ? "bg-primary text-white border border-primary shadow-[0_0_10px_rgba(236,19,19,0.3)]"
                                            : "bg-[#1a1414] text-text-secondary border border-[#392828] hover:border-primary hover:text-white"
                                        }`}
                                >
                                    {genre}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Cinema */}
                    <div className="p-5 rounded-xl bg-surface-dark border border-[#392828]">
                        <h4 className="text-white font-semibold text-sm tracking-wide mb-4">
                            Preferred Cinema
                        </h4>
                        <div className="relative">
                            <select 
                                value={localPreferences.preferredCinema}
                                onChange={handleCinemaChange}
                                className="w-full rounded-xl bg-[#1a1414] border border-[#392828] text-white px-4 py-3 text-sm appearance-none focus:outline-none focus:border-primary transition-all cursor-pointer"
                            >
                                <option>CineMax Downtown</option>
                                <option>CineMax Westside</option>
                                <option>CineMax North Hills</option>
                            </select>
                            <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="p-5 rounded-xl bg-surface-dark border border-[#392828]">
                        <h4 className="text-white font-semibold text-sm tracking-wide mb-4">
                            Notification Settings
                        </h4>
                        <div className="flex flex-col gap-4">
                            <label className="flex items-center justify-between cursor-pointer group">
                                <span className="text-white text-sm group-hover:text-primary transition-colors">
                                    All Notifications
                                </span>
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={localPreferences.notifications}
                                    onChange={toggleNotification}
                                />
                                <div className="w-11 h-6 bg-[#291e1e] peer-focus:outline-none rounded-full peer relative peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:bg-primary" />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className="px-6 py-3 rounded-xl bg-primary hover:bg-red-600 text-white text-sm font-semibold tracking-wide shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        Save Preferences
                    </button>
                </div>
            </div>
        </section>
    );
}