import { TheaterFeatures } from "@/interface/theater";
import { FaCheckCircle, FaParking } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { IoCalendarNumberSharp, IoCall, IoFastFood, IoSparkles } from "react-icons/io5";
import { MdEmail, MdLocalActivity } from "react-icons/md";

interface TheaterInfoProps {
    description: string;
    phone?: string;
    email?: string;
    features: TheaterFeatures;
    amenities: string[];
}

const TheaterInfo = ({ description, phone, email, features, amenities }: TheaterInfoProps) => {
    const amenityIcons: Record<string, React.ReactNode> = {
        "Parking": <FaParking />,
        "Food Court": <IoFastFood />,
        "Wheelchair Access": <IoIosInformationCircle />,
        "Recliners": <IoIosInformationCircle />,
        "Dolby Atmos": <IoIosInformationCircle />,
        "4K Laser": <IoIosInformationCircle />,
        "IMAX": <IoIosInformationCircle />,
        "IMAX 3D": <IoIosInformationCircle />,
        "Premium Lounge": <IoSparkles />,
    };

    const featureItems = [
        { key: "mTicket", label: "M-Ticket", icon: <IoCalendarNumberSharp />, available: features.mTicket },
        { key: "foodBeverage", label: "F&B", icon: <IoFastFood />, available: features.foodBeverage },
        { key: "parking", label: "Parking", icon: <FaParking />, available: features.parking },
        { key: "wheelchair", label: "Wheelchair", icon: <IoIosInformationCircle />, available: features.wheelchair },
        { key: "dolby", label: "Dolby Atmos", icon: <IoIosInformationCircle />, available: features.dolby },
        { key: "imax", label: "IMAX", icon: <IoIosInformationCircle />, available: features.imax },
        { key: "recliners", label: "Recliners", icon: <IoIosInformationCircle />, available: features.recliners },
        { key: "fourK", label: "4K Projection", icon: <IoIosInformationCircle />, available: features.fourK },
    ];

    return (
        <div className="space-y-6">
            {/* About Section */}
            <div className="bg-surface-dark rounded-xl p-6 border border-[#392828]">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <IoIosInformationCircle className="text-primary text-2xl" />
                    About the Theater
                </h3>
                <p className="text-text-secondary leading-relaxed">{description}</p>
            </div>

            {/* Contact Info */}
            {(phone || email) && (
                <div className="bg-surface-dark rounded-xl p-6 border border-[#392828]">
                    <h4 className="text-white font-bold mb-3">Contact Information</h4>
                    <div className="space-y-3">
                        {phone && (
                            <div className="flex items-center gap-3 text-text-secondary">
                                <IoCall className="text-primary text-xl" />
                                <span>{phone}</span>
                            </div>
                        )}
                        {email && (
                            <div className="flex items-center gap-3 text-text-secondary">
                                <MdEmail className="text-primary text-xl" />
                                <span>{email}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Features Section */}
            <div className="bg-surface-dark rounded-xl p-6 border border-[#392828]">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <MdLocalActivity className="text-primary text-2xl" />
                    Features
                </h4>
                <div className="grid grid-cols-2 gap-3">
                    {featureItems.map(
                        (item) =>
                            item.available && (
                                <div
                                    key={item.key}
                                    className="flex items-center gap-2 p-2 rounded bg-[#1f1616] border border-[#392828]"
                                >
                                    <span className="text-text-secondary text-xl">{item.icon}</span>
                                    <span className="text-xs text-gray-300 font-medium">{item.label}</span>
                                </div>
                            )
                    )}
                </div>
            </div>

            {/* Amenities Section */}
            <div className="bg-surface-dark rounded-xl p-6 border border-[#392828]">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <IoSparkles className="text-primary text-2xl" />
                    Amenities
                </h4>
                <div className="grid grid-cols-2 gap-3">
                    {amenities.map((amenity) => (
                        <div
                            key={amenity}
                            className="flex items-center gap-2 p-2 rounded bg-[#1f1616] border border-[#392828]"
                        >
                            <span className="text-text-secondary text-xl">
                                {amenityIcons[amenity] || <FaCheckCircle />}
                            </span>
                            <span className="text-xs text-gray-300 font-medium">{amenity}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TheaterInfo;