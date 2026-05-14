import Image from "next/image";
import { FiDownload, FiCheckCircle } from "react-icons/fi";
import { MdOutlineMovieFilter } from "react-icons/md";
import getImage from "@/utils/imageUrl";

interface Seat {
    id: string;
    row: string;
    number: number;
    type: "standard" | "vip";
    price: number;
}

interface TicketCardProps {
    seat: Seat;
    movieDetails: {
        title: string;
        theater: string;
        screen: string;
        date: string;
        time: string;
        poster: string;
    };
    bookingId: string;
    onPrintSingle: (seatId: string) => void;
}

export default function TicketCard({ seat, movieDetails, bookingId, onPrintSingle }: TicketCardProps) {
    const imageSrc = movieDetails.poster
        ? (String(movieDetails.poster).startsWith("http") ? String(movieDetails.poster) : getImage(String(movieDetails.poster), 'movies'))
        : "https://via.placeholder.com/300x450?text=No+Poster";

    return (
        <div
            id={`ticket-${seat.id}`}
            className="bg-surface-dark border border-[#392828] rounded-2xl overflow-hidden shadow-2xl flex flex-col sm:flex-row min-h-[250px] group hover:border-primary/30 transition-all duration-500 print:block print:w-full print:mb-12 print:break-inside-avoid print:border-2 print:border-black print:bg-white print:text-black"
        >
            {/* Poster Side */}
            <div className="relative w-full sm:w-[180px] shrink-0 overflow-hidden print:w-[150px] print:h-[225px] print:float-left print:mr-6">
                <Image
                    src={imageSrc as string}
                    alt={movieDetails.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/60 sm:bg-gradient-to-r from-black/90 to-transparent print:hidden" />
            </div>

            {/* Details Side */}
            <div className="flex-1 p-6 relative flex flex-col justify-between print:w-2/3 print:float-right">

                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#ec13131a] border border-[#ec131333] rounded text-[#ec1313] print:border-black print:bg-transparent print:text-black">
                                    <MdOutlineMovieFilter className="text-sm" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">CineBook Official</span>
                                </div>
                                <div className="flex items-center gap-1 text-[9px] text-[#10b981] font-bold uppercase tracking-widest print:text-black">
                                    <FiCheckCircle />
                                    <span>Verified</span>
                                </div>
                            </div>
                            <p className="text-text-secondary text-[10px] uppercase tracking-[0.2em] font-bold mb-1 print:text-gray-500">Admit One</p>
                            <h3 className="text-xl font-bold text-white leading-tight mb-2 print:text-black">{movieDetails.title}</h3>
                            <div className="flex flex-col gap-1">
                                <p className="text-[#b99d9d] text-xs flex items-center gap-2 print:text-gray-600">
                                    <span className="w-1 h-1 rounded-full bg-[#ec1313]" />
                                    {movieDetails.theater} • {movieDetails.screen}
                                </p>
                                <p className="text-[#b99d9d] text-xs flex items-center gap-2 print:text-gray-600">
                                    <span className="w-1 h-1 rounded-full bg-[#ec1313]" />
                                    {movieDetails.date} at {movieDetails.time}
                                </p>
                            </div>
                        </div>
                        <div className="w-16 h-16 bg-white rounded flex items-center justify-center p-1 shrink-0">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CINEBOOK-${bookingId}-${seat.id}`}
                                alt="QR Code"
                                width={60}
                                height={60}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-t border-b border-[#392828] border-dashed py-4 mb-4 print:border-gray-300">
                        <div>
                            <span className="block text-[10px] text-text-secondary uppercase tracking-widest mb-1 print:text-gray-500">Row</span>
                            <span className="block text-xl font-bold text-white print:text-black">{seat.row}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] text-text-secondary uppercase tracking-widest mb-1 print:text-gray-500">Seat</span>
                            <span className="block text-xl font-bold text-white print:text-black">{seat.number}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] text-[#b99d9d] uppercase tracking-widest mb-1 print:text-gray-500">Class</span>
                            <span className="block text-xl font-bold text-[#ec1313] capitalize print:text-black">{seat.type}</span>
                        </div>
                    </div>
                    <div className="text-[10px] text-[#b99d9d] flex justify-between items-center print:text-gray-500 uppercase tracking-widest mb-4">
                        <span>Booking ID: {bookingId.toUpperCase()}</span>
                        <span className="text-sm font-bold text-white print:text-black">LKR {seat.price.toLocaleString()}</span>
                    </div>

                    <div className="hidden print:block border-t border-black pt-4">
                        <p className="text-[8px] font-bold uppercase mb-1">Important Information</p>
                        <ul className="text-[7px] text-gray-600 list-disc pl-3 space-y-0.5">
                            <li>Please present this E-Ticket at the entrance.</li>
                            <li>Arrive at least 15 minutes before showtime.</li>
                            <li>Tickets are non-refundable and non-transferable.</li>
                            <li>Rights of admission reserved by CineBook.</li>
                        </ul>
                    </div>
                </div>

                <button
                    onClick={() => onPrintSingle(seat.id)}
                    className="mt-6 w-full py-3 border border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-[10px] rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn print:hidden"
                >
                    <FiDownload className="group-hover/btn:translate-y-0.5 transition-transform" />
                    Download E-Ticket
                </button>

            </div>
        </div>
    );
}
