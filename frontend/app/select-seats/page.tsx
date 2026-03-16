import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Header from '@/containers/seat-selection/Header';

export default function SelectSeatsPage() {
    return (
        <>
            <Navbar />
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 py-8 flex-1">
                <Header
                    movie="Cyber Chronicles"
                    theater="Cineplex Downtown"
                    hall="4 - IMAX"
                    date="Today, 14 Oct"
                    time="06:00 PM"
                />
            </div>
            <Footer />
        </>
    );
}