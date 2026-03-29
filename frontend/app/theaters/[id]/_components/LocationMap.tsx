import { IoLocationOutline } from "react-icons/io5";
import { MdDirections } from "react-icons/md";

interface LocationMapProps {
    address: string;
    location?: { lat: number; lng: number };
    name: string;
}

const LocationMap = ({ address, location, name }: LocationMapProps) => {
    const googleMapsUrl = location
        ? `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

    const embedUrl = location
        ? `https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`
        : `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`;

    return (
        <div className="bg-surface-dark rounded-xl overflow-hidden border border-[#392828] shadow-xl max-w-md">
            <div className="h-64 bg-[#1c1414] relative group cursor-pointer overflow-hidden">
                <iframe
                    title={name}
                    src={embedUrl}
                    className="w-full h-full border-0 grayscale-[0.2] contrast-[1.2]"
                    loading="lazy"
                    allowFullScreen
                ></iframe>

                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors pointer-events-none"></div>

                <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2 bg-surface-dark/90 backdrop-blur-md px-6 py-3 rounded-lg border border-white/10 hover:bg-primary transition-all scale-95 group-hover:scale-100 shadow-2xl"
                >
                    <IoLocationOutline className="text-primary group-hover:text-white text-3xl transition-transform" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Expand Map
                    </span>
                </a>
            </div>

            <div className="p-6 bg-[#1c1414]">
                <h4 className="text-white font-bold mb-1">{name}</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{address}</p>

                <a
                    className="w-full flex items-center justify-center gap-2 bg-[#392828] hover:bg-primary text-white py-3 rounded-lg text-sm font-bold transition-all active:scale-[0.98]"
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <MdDirections className="text-xl" />
                    Get Directions
                </a>
            </div>
        </div>
    );
};

export default LocationMap;