'use client';

import { MdNotificationsActive } from 'react-icons/md';

interface NotificationSettingsProps {
    emailReleases: boolean;
    onEmailReleasesChange: (value: boolean) => void;
    emailPromos: boolean;
    onEmailPromosChange: (value: boolean) => void;
    pushReminders: boolean;
    onPushRemindersChange: (value: boolean) => void;
    pushAlerts: boolean;
    onPushAlertsChange: (value: boolean) => void;
}

export function NotificationSettings({
    emailReleases,
    onEmailReleasesChange,
    emailPromos,
    onEmailPromosChange,
    pushReminders,
    onPushRemindersChange,
    pushAlerts,
    onPushAlertsChange,
}: NotificationSettingsProps) {
    return (
        <section>
            <div className="flex items-center gap-3 mb-8">
                <MdNotificationsActive className="text-primary text-xl" />

                <h2 className="text-xl font-bold text-white tracking-wider">
                    Notification Settings
                </h2>
            </div>

            <div className="bg-[#1a1414] p-8 rounded-xl border border-[#392828] shadow-2xl space-y-10">

                <div>
                    <div className="flex items-center gap-3 mb-5">
                        <h3 className="text-white text-lg font-semibold tracking-wide">
                            Email Notifications
                        </h3>
                    </div>

                    <div className="space-y-4">

                        <div className="flex items-start justify-between gap-6 p-5 rounded-xl bg-surface-dark border border-[#392828]">

                            <div className="space-y-1">
                                <h4 className="text-white font-semibold text-sm tracking-wide">
                                    Movie Releases
                                </h4>

                                <p className="text-text-secondary text-sm leading-relaxed max-w-md">
                                    Get notified when newly released blockbuster movies become available.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => onEmailReleasesChange(!emailReleases)}
                                className={`w-12 h-6 rounded-full p-1 flex items-center transition-all duration-300 ${emailReleases
                                        ? 'bg-primary justify-end'
                                        : 'bg-surface-dark border border-[#392828] justify-start'
                                    }`}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full transition-all duration-300 ${emailReleases ? 'bg-white' : 'bg-white/30'
                                        }`}
                                />
                            </button>

                        </div>

                        <div className="flex items-start justify-between gap-6 p-5 rounded-xl bg-surface-dark border border-[#392828]">

                            <div className="space-y-1">
                                <h4 className="text-white font-semibold text-sm tracking-wide">
                                    Promotional Offers
                                </h4>

                                <p className="text-text-secondary text-sm leading-relaxed max-w-md">
                                    Receive exclusive discounts, special promotions, and early access offers.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => onEmailPromosChange(!emailPromos)}
                                className={`w-12 h-6 rounded-full p-1 flex items-center transition-all duration-300 ${emailPromos
                                        ? 'bg-primary justify-end'
                                        : 'bg-surface-dark border border-[#392828] justify-start'
                                    }`}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full transition-all duration-300 ${emailPromos ? 'bg-white' : 'bg-white/30'
                                        }`}
                                />
                            </button>

                        </div>

                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-3 mb-5">
                        <h3 className="text-white text-lg font-semibold tracking-wide">
                            Push Notifications
                        </h3>
                    </div>

                    <div className="space-y-4">

                        <div className="flex items-start justify-between gap-6 p-5 rounded-xl bg-surface-dark border border-[#392828]">

                            <div className="space-y-1">
                                <h4 className="text-white font-semibold text-sm tracking-wide">
                                    Booking Reminders
                                </h4>

                                <p className="text-text-secondary text-sm leading-relaxed max-w-md">
                                    Receive reminders before your scheduled movie showtime starts.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => onPushRemindersChange(!pushReminders)}
                                className={`w-12 h-6 rounded-full p-1 flex items-center transition-all duration-300 ${pushReminders
                                        ? 'bg-primary justify-end'
                                        : 'bg-surface-dark border border-[#392828] justify-start'
                                    }`}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full transition-all duration-300 ${pushReminders ? 'bg-white' : 'bg-white/30'
                                        }`}
                                />
                            </button>

                        </div>

                        <div className="flex items-start justify-between gap-6 p-5 rounded-xl bg-surface-dark border border-[#392828]">

                            <div className="space-y-1">
                                <h4 className="text-white font-semibold text-sm tracking-wide">
                                    Ticket Alerts
                                </h4>

                                <p className="text-text-secondary text-sm leading-relaxed max-w-md">
                                    Stay updated about seat availability, booking confirmations, and upgrades.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => onPushAlertsChange(!pushAlerts)}
                                className={`w-12 h-6 rounded-full p-1 flex items-center transition-all duration-300 ${pushAlerts
                                        ? 'bg-primary justify-end'
                                        : 'bg-surface-dark border border-[#392828] justify-start'
                                    }`}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full transition-all duration-300 ${pushAlerts ? 'bg-white' : 'bg-white/30'
                                        }`}
                                />
                            </button>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}