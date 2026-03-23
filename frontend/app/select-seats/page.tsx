
import Header from '@/containers/seat-selection/Header';

export default function SelectSeatsPage() {
    return (
        <>
            <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-10 lg:px-20 py-8 flex-1">
                <Header
                    movie="Cyber Chronicles"
                    theater="Cineplex Downtown"
                    hall="4 - IMAX"
                    date="Today, 14 Oct"
                    time="06:00 PM"
                />

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                    {/* <SeatMap />
                    <BookingSummary /> */}
                </div>
            </div>
        </>
    );
}