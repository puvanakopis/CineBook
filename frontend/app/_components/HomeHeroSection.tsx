"use client";

import { MdOutlineConfirmationNumber } from "react-icons/md";
import { FaRegPlayCircle } from "react-icons/fa";

const HomeHeroSection = () => {
    return (
        <div className="relative w-full h-[600px] flex items-center overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, rgba(24, 17, 17, 0.9) 0%, rgba(24, 17, 17, 0.6) 50%, rgba(24, 17, 17, 0.2) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAK49iY6bGVGGnvRJupkSyJazYWcBODgGWLZGl234FWP4n932kMbFWNdIDFCbUgCDL3IHtVUtev2b25IdJOJNrkGgi-TXB8TB8QTTv0Kl-IFIrSS5UKtOf6IIWVKXJQRV4qWzVqPQw7HTut9n6-nt34b2bMLwPKA-Zt2wNgRCcnjS8_dNdKyfJiTCkEBSctkVzVsR6U7ZISbKTsUWtL04LCLEsyLCsXt2zK0TF0b64mJ95C-DZsillERnc_KSXWYG88w_MsHqMJXm_9")',
                }}
            />

            {/* Content */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 pt-10">
                <div className="max-w-2xl flex flex-col gap-6 animate-fade-in-up">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        Now Showing
                    </span>
                    <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-[-0.033em] drop-shadow-xl">
                        Unleash the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-400">
                            Cinematic Magic
                        </span>
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl font-normal leading-relaxed max-w-lg drop-shadow-md">
                        Experience the latest blockbusters in immersive IMAX and Dolby Atmos. Book your seats
                        today and get lost in the story.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 mt-4">
                        <button className="bg-primary hover:bg-red-700 text-white text-base font-bold py-3.5 px-8 rounded-lg transition-all shadow-lg hover:shadow-primary/40 flex items-center gap-2">
                            <span className="material-symbols-outlined">
                                <MdOutlineConfirmationNumber />
                            </span>
                            Book Now
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white text-base font-bold py-3.5 px-8 rounded-lg transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined">
                                <FaRegPlayCircle />
                            </span>
                            Watch Trailer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeHeroSection;