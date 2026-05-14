'use client';

import { IoMailOutline, IoCallOutline, IoPersonOutline } from "react-icons/io5";
import { useState } from "react";

interface PersonalInfoFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export function PersonalInfoForm() {
    const [formData, setFormData] = useState<PersonalInfoFormData>({
        firstName: "Alex",
        lastName: "Doe",
        email: "alex.doe@example.com",
        phone: "+1 (555) 000-0000",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Saving personal info...", formData);
    };

    return (
        <section>

            <div className="flex items-center gap-3 mb-8">
                <IoPersonOutline className="text-primary text-xl" />

                <h2 className="text-xl font-bold text-white tracking-wider">
                    Personal Information
                </h2>
            </div>

            <div className="bg-[#1a1414] p-8 rounded-xl border border-[#392828] shadow-2xl">

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Name Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="p-5 rounded-xl bg-surface-dark border border-[#392828]">
                            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">
                                First Name
                            </h4>

                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Enter first name"
                                className="w-full rounded-xl bg-[#1a1414] border border-[#392828] text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-text-secondary/40"
                            />
                        </div>

                        <div className="p-5 rounded-xl bg-surface-dark border border-[#392828]">
                            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">
                                Last Name
                            </h4>

                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Enter last name"
                                className="w-full rounded-xl bg-[#1a1414] border border-[#392828] text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-text-secondary/40"
                            />
                        </div>

                    </div>

                    {/* Contact Section */}
                    <div className="space-y-4">

                        <div className="p-5 rounded-xl bg-surface-dark border border-[#392828]">
                            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">
                                Email Address
                            </h4>

                            <div className="relative">
                                <IoMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-lg" />

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    className="w-full rounded-xl bg-[#1a1414] border border-[#392828] text-white pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-text-secondary/40"
                                />
                            </div>
                        </div>

                        <div className="p-5 rounded-xl bg-surface-dark border border-[#392828]">
                            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">
                                Phone Number
                            </h4>

                            <div className="relative">
                                <IoCallOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-lg" />

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    className="w-full rounded-xl bg-[#1a1414] border border-[#392828] text-white pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-text-secondary/40"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Action Button */}
                    <div className="pt-2 flex justify-end">

                        <button
                            type="submit"
                            className="px-6 py-3 rounded-xl bg-primary hover:bg-red-600 text-white text-sm font-semibold tracking-wide shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>

        </section>
    );
}