const MovieHeader = () => {
    return (
        <div className="relative py-12 px-4 md:px-10 lg:px-20 bg-surface-dark border-b border-[#392828]">
            <div className="w-full mx-auto  md:px-10 lg:px-20 relative z-20 max-w-[1400px] mx-auto">
                <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
                    All Movies
                </h1>
                <p className="text-text-secondary max-w-2xl text-lg">
                    Browse our extensive collection of current screenings. Filter by genre,
                    date, or theater to find the perfect showtime for you.
                </p>
            </div>
        </div>
    );
};

export default MovieHeader;