'use client';

import { useState, useEffect } from "react";
import { MdNotificationsActive } from "react-icons/md";

interface SecurityNotificationsProps {
    notifications?: boolean;
    onUpdate?: (notifications: boolean) => void;
}

export function SecurityNotifications({ 
    notifications = true, 
    onUpdate 
}: SecurityNotificationsProps) {
    const [isEnabled, setIsEnabled] = useState(notifications);

    useEffect(() => {
        setIsEnabled(notifications);
    }, [notifications]);

    const handleToggle = () => {
        const newValue = !isEnabled;
        setIsEnabled(newValue);
        if (onUpdate) {
            onUpdate(newValue);
        }
    };

    return (
        <section>
            <div className="flex items-center gap-3 mb-8">
                <MdNotificationsActive className="text-primary text-xl" />
                <h2 className="text-xl font-bold text-white tracking-wider">
                    Notification Settings
                </h2>
            </div>

            <div className="bg-[#1a1414] p-8 rounded-xl border border-[#392828] shadow-2xl">
                <div className="p-5 rounded-xl bg-surface-dark border border-[#392828]">
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                        <div className="space-y-3 flex-1">
                            <h4 className="text-white font-semibold text-sm tracking-wide">
                                All Notifications
                            </h4>
                            <p className="text-text-secondary text-sm leading-relaxed max-w-2xl">
                                Manage how you receive updates about your bookings, 
                                new movie releases, and exclusive cinematic offers.
                            </p>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isEnabled}
                                onChange={handleToggle}
                            />
                            <div className="w-14 h-7 bg-[#291e1e] peer-focus:outline-none rounded-full peer relative peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:h-[21px] after:w-[21px] after:rounded-full after:transition-all peer-checked:bg-primary shadow-inner" />
                        </label>
                    </div>
                </div>
            </div>
        </section>
    );
}
