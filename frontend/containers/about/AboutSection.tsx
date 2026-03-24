import React from "react";
import Link from "next/link";
import { FiTarget } from "react-icons/fi";
import { MdHistoryEdu, MdOutlineDiversity3, MdOutlineMovie, MdOutlineVisibility } from "react-icons/md";

const AboutSection: React.FC = () => {
    return (
        <section className="w-full max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 pb-20 relative ">
            {/* Our Story */}
            <div className="bg-surface-dark rounded-xl overflow-hidden border border-[#392828] shadow-2xl mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left */}
                    <div className="p-8 md:p-12 flex flex-col justify-center gap-6">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary text-3xl">
                                <MdHistoryEdu />
                            </span>
                            <h2 className="text-3xl font-bold text-white">Our Story</h2>
                        </div>

                        <div className="space-y-4 text-text-secondary text-lg leading-relaxed">
                            <p>
                                Founded in anticipation of the groundbreaking cinematic year of
                                2025, CineBook was born from a simple yet powerful idea: to create
                                a booking platform that truly understands the pulse of Kollywood
                                fans.
                            </p>
                            <p>
                                While other platforms treat movies as just another ticket, we
                                treat them as events. CineBook is a seamless, fan-first ecosystem
                                designed to bring the magic of Tamil cinema closer to you—faster
                                than ever.
                            </p>
                        </div>

                        <div className="pt-4">
                            <div className="flex gap-8">
                                <div>
                                    <p className="text-3xl font-black text-white">500+</p>
                                    <p className="text-sm text-text-secondary mt-1">
                                        Theaters Partnered
                                    </p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-white">2M+</p>
                                    <p className="text-sm text-text-secondary mt-1">
                                        Happy Users
                                    </p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-white">24/7</p>
                                    <p className="text-sm text-text-secondary mt-1">
                                        Customer Support
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="relative h-[300px] lg:h-auto bg-[#1a1111] overflow-hidden">
                        {/* Background gradient overlay */}
                        <div className="absolute inset-0 bg-surface-dark" />

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col justify-end p-8 gap-6">
                            {/* Location */}
                            <div>
                                <p className="text-white font-bold text-xl">
                                    Sri Lanka Operations
                                </p>
                                <p className="text-primary text-sm">
                                    Colombo, Sri Lanka 🇱🇰
                                </p>
                            </div>

                            {/* Local Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-black/40 backdrop-blur rounded-lg p-4 border border-[#392828]">
                                    <p className="text-2xl font-black text-white">120+</p>
                                    <p className="text-xs text-text-secondary mt-1">
                                        Local Theaters
                                    </p>
                                </div>

                                <div className="bg-black/40 backdrop-blur rounded-lg p-4 border border-[#392828]">
                                    <p className="text-2xl font-black text-white">15+</p>
                                    <p className="text-xs text-text-secondary mt-1">
                                        Cities Covered
                                    </p>
                                </div>

                                <div className="bg-black/40 backdrop-blur rounded-lg p-4 border border-[#392828]">
                                    <p className="text-2xl font-black text-white">500K+</p>
                                    <p className="text-xs text-text-secondary mt-1">
                                        Active Users
                                    </p>
                                </div>

                                <div className="bg-black/40 backdrop-blur rounded-lg p-4 border border-[#392828]">
                                    <p className="text-2xl font-black text-white">2024</p>
                                    <p className="text-xs text-text-secondary mt-1">
                                        Launched in Sri Lanka
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Mission / Vision / Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {[
                    {
                        icon: <FiTarget />,
                        title: "Our Mission",
                        text:
                            "To simplify the movie-going experience with a fast, reliable booking platform tailored for Tamil cinema.",
                    },
                    {
                        icon: <MdOutlineVisibility />,
                        title: "Our Vision",
                        text:
                            "To become the world’s most loved platform for regional entertainment by 2026.",
                    },
                    {
                        icon: <MdOutlineDiversity3 />,
                        title: "Our Values",
                        text:
                            "Community, Transparency, and Passion—every ticket is a promise of an unforgettable experience.",
                    },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="bg-surface-dark p-8 rounded-xl border border-[#392828] hover:border-primary/50 transition-colors group"
                    >
                        <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                            <span className="material-symbols-outlined text-3xl">
                                {item.icon}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                            {item.title}
                        </h3>
                        <p className="text-text-secondary leading-relaxed">
                            {item.text}
                        </p>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary to-[#8a0a0a] rounded-xl p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                <div className="relative z-10 flex flex-col items-center gap-6">
                    <span className="material-symbols-outlined text-5xl text-white/90">
                        <MdOutlineMovie />
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-white">
                        Ready for the Next Blockbuster?
                    </h2>
                    <p className="text-white/90 text-lg max-w-2xl">
                        Don’t miss out on the biggest hits of 2025. Experience seamless
                        booking with CineBook today.
                    </p>
                    <div className="flex gap-4">
                        <button className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition">
                            Book Tickets
                        </button>
                        <Link href="/contact">
                            <button className="bg-black/30 text-white font-bold py-3 px-8 rounded-lg border border-white/20 hover:bg-black/50 transition">
                                Contact Us
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;