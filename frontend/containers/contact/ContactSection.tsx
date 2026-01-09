import React from "react";
import { AiOutlineSend } from "react-icons/ai";
import { GoMail } from "react-icons/go";
import { MdAccessible, MdAlternateEmail, MdOutlineConfirmationNumber, MdOutlineExpandMore, MdOutlineSupportAgent } from "react-icons/md";
import { RiGroupLine } from "react-icons/ri";

const ContactSection: React.FC = () => {
    return (
        <section className="w-full max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 py-12 -mt-20 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Contact Form */}
                <div className="lg:col-span-7 flex flex-col">
                    <div className="bg-surface-dark rounded-xl p-6 md:p-8 border border-[#392828] shadow-2xl">
                        <h2 className="text-white text-2xl font-bold leading-tight tracking-[-0.015em] mb-6 flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary"><GoMail /></span>
                            Send us a Message
                        </h2>
                        <form className="flex flex-col gap-6">
                            {/* Name & Email */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <label className="flex flex-col flex-1 gap-2">
                                    <span className="text-white text-sm font-medium">Full Name</span>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full rounded-lg bg-input-bg border-none text-white placeholder:text-text-secondary h-12 px-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                    />
                                </label>
                                <label className="flex flex-col flex-1 gap-2">
                                    <span className="text-white text-sm font-medium">Email Address</span>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full rounded-lg bg-input-bg border-none text-white placeholder:text-text-secondary h-12 px-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                    />
                                </label>
                            </div>

                            {/* Inquiry Type */}
                            <label className="flex flex-col gap-2">
                                <span className="text-white text-sm font-medium">Inquiry Type</span>
                                <div className="relative">
                                    <div className="relative w-full">
                                        <select
                                            defaultValue=""
                                            className="w-full appearance-none rounded-lg bg-input-bg border-none text-white h-12 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer"
                                        >
                                            <option disabled value="">Select an issue</option>
                                            <option value="ticket">Ticket Issue</option>
                                            <option value="refund">Refund Request</option>
                                            <option value="technical">Technical Support</option>
                                            <option value="group">Group Booking</option>
                                        </select>
                                    </div>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
                                        <span className="material-symbols-outlined"><MdOutlineExpandMore /></span>
                                    </div>
                                </div>
                            </label>

                            {/* Message */}
                            <label className="flex flex-col gap-2">
                                <span className="text-white text-sm font-medium">Your Message</span>
                                <textarea
                                    placeholder="Tell us how we can help..."
                                    className="w-full rounded-lg bg-input-bg border-none text-white placeholder:text-text-secondary min-h-[160px] p-4 resize-y focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                />
                            </label>

                            {/* Submit Button */}
                            <button
                                type="button"
                                className="mt-2 w-full md:w-auto self-start bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 group"
                            >
                                Send Message
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-sm">
                                    <AiOutlineSend />
                                </span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Quick Contact & Locations */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    {/* Quick Contact */}
                    <div className="bg-surface-dark rounded-xl p-6 md:p-8 border border-[#392828] shadow-lg">
                        <h3 className="text-white text-xl font-bold mb-6">Quick Contact</h3>
                        <div className="flex flex-col gap-5">
                            <div className="flex items-start gap-4">
                                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-primary"><MdOutlineSupportAgent /></span>
                                </div>
                                <div>
                                    <p className="text-text-secondary text-sm font-medium">Customer Support Hotline</p>
                                    <p className="text-white text-lg font-semibold mt-0.5">+94 11 123 4567</p>
                                    <p className="text-xs text-text-secondary mt-1">Mon-Sun: 9am - 9pm SLT</p>
                                </div>
                            </div>
                            <div className="h-px bg-[#392828] w-full"></div>
                            <div className="flex items-start gap-4">
                                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-primary"><MdAlternateEmail /></span>
                                </div>
                                <div>
                                    <p className="text-text-secondary text-sm font-medium">Email Support</p>
                                    <p className="text-white text-lg font-semibold mt-0.5">support@cinebook.lk</p>
                                    <p className="text-xs text-text-secondary mt-1">We usually reply within 24 hours.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Locations */}
                    <div className="bg-surface-dark rounded-xl p-6 md:p-8 border border-[#392828] shadow-lg flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-white text-xl font-bold">Top Locations</h3>
                            <a href="#" className="text-primary text-sm font-semibold hover:underline">View All</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            {[
                                {
                                    name: "Colombo City Cinema",
                                    address: "No. 12, Galle Road, Colombo 03",
                                },
                                {
                                    name: "Kandy Regal Theatre",
                                    address: "15 Temple Rd, Kandy",
                                },
                                {
                                    name: "Galle Lighthouse Cinema",
                                    address: "5 Lighthouse Street, Galle",
                                }
                            ].map((location, idx) => (
                                <div
                                    key={idx}
                                    className="group flex gap-4 p-3 rounded-lg hover:bg-[#392828] transition-colors cursor-pointer border border-transparent hover:border-[#4a3535]"
                                >
                                    <div className="flex flex-col justify-center">
                                        <h4 className="text-white font-bold leading-tight group-hover:text-primary transition-colors">
                                            {location.name}
                                        </h4>
                                        <p className="text-text-secondary text-sm mt-1">{location.address}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


            </div>

            {/* FAQ Section */}
            <div className="mt-16 mb-8">
                <h2 className="text-white text-2xl font-bold leading-tight tracking-[-0.015em] mb-8 text-center">
                    Frequently Asked Questions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            icon: <MdOutlineConfirmationNumber size={25} />,
                            title: "Ticket Cancellations",
                            description:
                                "Tickets can be cancelled up to 60 minutes before showtime for a full refund to your original payment method.",
                        },
                        {
                            icon: <RiGroupLine size={25} />,
                            title: "Group Bookings",
                            description:
                                "For groups larger than 20, please use the inquiry form above to get special rates and reserved seating blocks.",
                        },
                        {
                            icon: <MdAccessible size={25} />,
                            title: "Accessibility",
                            description:
                                "All our theaters offer wheelchair accessible seating and companion seats. Assistive listening devices are available at the counter.",
                        },
                    ].map((faq, idx) => (
                        <div
                            key={idx}
                            className="bg-surface-dark p-6 rounded-lg border border-[#392828] hover:border-primary/30 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span className="material-symbols-outlined text-primary">{faq.icon}</span>
                                <h3 className="text-white font-bold text-base">{faq.title}</h3>
                            </div>
                            <p className="text-text-secondary text-sm leading-relaxed">{faq.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactSection;