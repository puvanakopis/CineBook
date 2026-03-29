import Image from "next/image";
import { FiDownload } from "react-icons/fi";

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
        hall: string;
        date: string;
        time: string;
        poster: string;
    };
    printingSeatId: string | null;
    onPrintSingle: (seatId: string) => void;
}

export default function TicketCard({ seat, movieDetails, printingSeatId, onPrintSingle }: TicketCardProps) {
    return (
        <div 
            className={`bg-[var(--color-surface-dark)] border border-[#392828] rounded-2xl overflow-hidden shadow-2xl flex flex-col sm:flex-row print:block print:w-full print:mb-8 print:break-inside-avoid print:border-black print:bg-white print:text-black ${printingSeatId && printingSeatId !== seat.id ? 'print:hidden' : ''}`}
        >
            {/* Poster Side */}
            <div className="relative w-full sm:w-1/3 aspect-[2/3] sm:aspect-auto print:w-1/3 print:float-left print:aspect-[2/3]">
                <Image 
                    src={movieDetails.poster} 
                    alt={movieDetails.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent sm:bg-gradient-to-r print:hidden" />
            </div>

            {/* Details Side */}
            <div className="flex-1 p-6 relative flex flex-col justify-between print:w-2/3 print:float-right">
                
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-[var(--color-text-secondary)] text-xs uppercase tracking-wider font-bold mb-1 print:text-gray-500">Admit One</p>
                            <h3 className="text-2xl font-bold text-white leading-tight mb-2 print:text-black">{movieDetails.title}</h3>
                            <p className="text-[var(--color-text-secondary)] text-sm print:text-gray-600">{movieDetails.theater} • {movieDetails.hall}</p>
                            <p className="text-[var(--color-text-secondary)] text-sm print:text-gray-600">{movieDetails.date} at {movieDetails.time}</p>
                        </div>
                        <div className="w-16 h-16 bg-white rounded flex items-center justify-center p-1 shrink-0">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CINEBOOK-${seat.id}-${Math.random().toString(36).substring(7)}`}
                                alt="QR Code"
                                width={60}
                                height={60}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-t border-b border-[#392828] border-dashed py-4 mb-4 print:border-gray-300">
                        <div>
                            <span className="block text-xs text-[var(--color-text-secondary)] uppercase print:text-gray-500">Row</span>
                            <span className="block text-xl font-bold text-white print:text-black">{seat.row}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-[var(--color-text-secondary)] uppercase print:text-gray-500">Seat</span>
                            <span className="block text-xl font-bold text-white print:text-black">{seat.number}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-[var(--color-text-secondary)] uppercase print:text-gray-500">Class</span>
                            <span className="block text-xl font-bold text-[var(--color-primary)] capitalize print:text-black">{seat.type}</span>
                        </div>
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)] flex justify-between print:text-gray-500">
                        <span>Booking ID: CBK-{seat.id}-{Date.now().toString().slice(-6)}</span>
                        <span>${seat.price.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    onClick={() => onPrintSingle(seat.id)}
                    className="mt-6 w-full py-3 border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 print:hidden"
                >
                    <FiDownload />
                    Download Ticket
                </button>

            </div>
        </div>
    );
}
