'use client';

import { IoChevronDown } from "react-icons/io5";
import { useState } from "react";

const genres = ["Action", "Comedy", "Sci-Fi", "Horror", "Drama", "Thriller", "Romance", "Animation"];

export function PreferencesSection() {
    const [selectedGenres, setSelectedGenres] = useState(["Action", "Sci-Fi"]);
    const [notifications, setNotifications] = useState({
        releases: true,
        sales: false,
    });

    const toggleGenre = (genre: string) => {
        setSelectedGenres(prev =>
            prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre]
        );
    };

    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <section>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-white text-xl font-bold">Preferences</h3>
            </div>
            <div className="bg-[#291e1e]/30 p-6 rounded-xl border border-[#392828]/50 space-y-8">
                <div>
                    <p className="text-text-secondary text-sm font-medium mb-4">Favorite Genres</p>
                    <div className="flex flex-wrap gap-3">
                        {genres.map((genre) => {
                            const isSelected = selectedGenres.includes(genre);
                            return (
                                <button
                                    key={genre}
                                    onClick={() => toggleGenre(genre)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isSelected
                                            ? "bg-primary text-white border border-primary shadow-[0_0_10px_rgba(236,19,19,0.3)]"
                                            : "bg-surface-dark text-text-secondary border border-[#392828] hover:border-text-secondary hover:text-white"
                                        }`}
                                >
                                    {genre}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <p className="text-text-secondary text-sm font-medium mb-3">Preferred Cinema</p>
                        <div className="relative">
                            <select className="w-full rounded-lg bg-surface-dark border border-[#392828] text-white p-3 appearance-none focus:outline-none focus:border-primary transition-all cursor-pointer">
                                <option>CineMax Downtown</option>
                                <option>CineMax Westside</option>
                                <option>CineMax North Hills</option>
                            </select>
                            <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-text-secondary pointer-events-none" />
                        </div>
                    </div>

                    <div>
                        <p className="text-text-secondary text-sm font-medium mb-3">Notification Settings</p>
                        <div className="flex flex-col gap-3">
                            <label className="flex items-center justify-between cursor-pointer group">
                                <span className="text-white text-sm group-hover:text-primary transition-colors">New Movie Releases</span>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={notifications.releases}
                                        onChange={() => toggleNotification("releases")}
                                    />
                                    <div className="w-11 h-6 bg-[#291e1e] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </div>
                            </label>
                            <label className="flex items-center justify-between cursor-pointer group">
                                <span className="text-white text-sm group-hover:text-primary transition-colors">Ticket Sale Alerts</span>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={notifications.sales}
                                        onChange={() => toggleNotification("sales")}
                                    />
                                    <div className="w-11 h-6 bg-[#291e1e] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}