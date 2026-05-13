import Image from "next/image";
import { FiDownload } from "react-icons/fi";
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
    printingSeatId: string | null;
    onPrintSingle: (seatId: string) => void;
}

export default function TicketCard({ seat, movieDetails, bookingId, printingSeatId, onPrintSingle }: TicketCardProps) {
    const imageSrc = movieDetails.poster
        ? (String(movieDetails.poster).startsWith("http") ? String(movieDetails.poster) : getImage(String(movieDetails.poster), 'movies'))
        : "https://via.placeholder.com/300x450?text=No+Poster";

    return (
        <div 
            className={`bg-surface-dark border border-[#392828] rounded-2xl overflow-hidden shadow-2xl flex flex-col sm:flex-row min-h-[250px] group hover:border-primary/30 transition-all duration-500 print:block print:w-full print:mb-8 print:break-inside-avoid print:border-black print:bg-white print:text-black ${printingSeatId && printingSeatId !== seat.id ? 'print:hidden' : ''}`}
        >
            {/* Poster Side */}
            <div className="relative w-full sm:w-[180px] shrink-0 overflow-hidden print:w-1/3 print:float-left print:aspect-[2/3]">
                <Image 
                    src={imageSrc as string} 
                    alt={movieDetails.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent sm:bg-gradient-to-r print:hidden" />
            </div>

            {/* Details Side */}
            <div className="flex-1 p-6 relative flex flex-col justify-between print:w-2/3 print:float-right">
                
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                        <div>
                            <p className="text-text-secondary text-[10px] uppercase tracking-[0.2em] font-bold mb-1 print:text-gray-500">Admit One</p>
                            <h3 className="text-xl font-bold text-white leading-tight mb-2 print:text-black">{movieDetails.title}</h3>
                            <div className="flex flex-col gap-1">
                                <p className="text-text-secondary text-xs flex items-center gap-2 print:text-gray-600">
                                    <span className="w-1 h-1 rounded-full bg-primary" />
                                    {movieDetails.theater} • {movieDetails.screen}
                                </p>
                                <p className="text-text-secondary text-xs flex items-center gap-2 print:text-gray-600">
                                    <span className="w-1 h-1 rounded-full bg-primary" />
                                    {movieDetails.date} at {movieDetails.time}
                                </p>
                            </div>
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
                            <span className="block text-[10px] text-text-secondary uppercase tracking-widest mb-1 print:text-gray-500">Class</span>
                            <span className="block text-xl font-bold text-primary capitalize print:text-black">{seat.type}</span>
                        </div>
                    </div>
                    <div className="text-[10px] text-text-secondary flex justify-between items-center print:text-gray-500 uppercase tracking-widest">
                        <span>Booking ID: {bookingId.toUpperCase()}</span>
                        <span className="text-sm font-bold text-white print:text-black">LKR {seat.price.toLocaleString()}</span>
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
