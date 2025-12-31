import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(24, 17, 17, 0.3) 0%, rgba(24, 17, 17, 1) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAK49iY6bGVGGnvRJupkSyJazYWcBODgGWLZGl234FWP4n932kMbFWNdIDFCbUgCDL3IHtVUtev2b25IdJOJNrkGgi-TXB8TB8QTTv0Kl-IFIrSS5UKtOf6IIWVKXJQRV4qWzVqPQw7HTut9n6-nt34b2bMLwPKA-Zt2wNgRCcnjS8_dNdKyfJiTCkEBSctkVzVsR6U7ZISbKTsUWtL04LCLEsyLCsXt2zK0TF0b64mJ95C-DZsillERnc_KSXWYG88w_MsHqMJXm_9")',
        }}
        aria-label="Dark moody cinema theater interior with red velvet seats"
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4 text-center max-w-2xl px-4 mt-10">
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

export default HeroSection;