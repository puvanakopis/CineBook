import React from "react";
import backgroundImage from "@/public/backgroundImage.png";

const ContactHeroSection = () => {
  return (
    <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(
                        to bottom,
                        rgba(24, 17, 17, 0.3) 0%,
                        rgba(24, 17, 17, 1) 100%
                    ), url(${backgroundImage.src})`,
        }}
        aria-label="Dark moody cinema theater interior with red velvet seats"
      >
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4 text-center max-w-2xl px-4 mt-10">
        <div className="inline-flex mx-auto items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-2">
          Customer Support
        </div>
        <h1 className="text-white text-5xl md:text-6xl font-black leading-tight tracking-[-0.033em]">
          Get in Touch
        </h1>
        <p className="text-gray-200 text-lg md:text-xl font-normal leading-normal max-w-lg mx-auto">
          We&#39;re here to help you enjoy the show. Reach out for support, inquiries, or feedback.
        </p>
      </div>
    </section>
  );
};

export default ContactHeroSection;