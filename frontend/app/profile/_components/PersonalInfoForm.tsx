'use client';

import { IoMailOutline, IoCallOutline, IoPersonOutline } from "react-icons/io5";

export function PersonalInfoForm() {
    return (
        <section>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <IoPersonOutline className="text-2xl text-primary" />
                    <h3 className="text-white text-xl font-bold">Personal Information</h3>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#291e1e]/30 p-6 rounded-xl border border-[#392828]/50">
                <label className="flex flex-col gap-2">
                    <span className="text-text-secondary text-sm font-medium">First Name</span>
                    <input
                        className="w-full rounded-lg bg-surface-dark border border-[#392828] text-white p-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/50"
                        type="text"
                        defaultValue="Alex"
                    />
                </label>

                <label className="flex flex-col gap-2">
                    <span className="text-text-secondary text-sm font-medium">Last Name</span>
                    <input
                        className="w-full rounded-lg bg-surface-dark border border-[#392828] text-white p-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/50"
                        type="text"
                        defaultValue="Doe"
                    />
                </label>

                <label className="flex flex-col gap-2">
                    <span className="text-text-secondary text-sm font-medium">Email Address</span>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">
                            <IoMailOutline className="text-lg text-text-secondary" />
                        </span>
                        <input
                            className="w-full rounded-lg bg-surface-dark border border-[#392828] text-white pl-10 p-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/50"
                            type="email"
                            defaultValue="alex.doe@example.com"
                        />
                    </div>
                </label>

                <label className="flex flex-col gap-2">
                    <span className="text-text-secondary text-sm font-medium">Phone Number</span>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">
                            <IoCallOutline className="text-lg text-text-secondary" />
                        </span>
                        <input
                            className="w-full rounded-lg bg-surface-dark border border-[#392828] text-white pl-10 p-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/50"
                            type="tel"
                            defaultValue="+1 (555) 000-0000"
                        />
                    </div>
                </label>
            </div>
        </section>
    );
}