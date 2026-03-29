const TheaterHeader = () => {
    return (
        <div className="relative py-12 bg-surface-dark border-b border-[#392828]">
            <div className="w-full mx-auto md:px-10 lg:px-20 relative z-20 max-w-[1400px]">
                <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
                    All Theaters
                </h1>
                <p className="text-text-secondary max-w-2xl text-lg">
                    Discover theaters near you and explore available screens, showtimes,
                    and facilities. Choose your preferred theater to enjoy the best
                    movie experience.
                </p>
            </div>
        </div>
    );
};

export default TheaterHeader;