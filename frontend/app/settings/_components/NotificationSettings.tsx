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

function ToggleSwitch({ enabled, onChange }: { enabled: boolean; onChange: (val: boolean) => void }) {
    return (
        <button
            onClick={() => onChange(!enabled)}
            className={`w-12 h-6 rounded-full p-1 flex items-center transition-all ${enabled ? 'bg-primary justify-end' : 'bg-[#1e1616] justify-start border border-[#392828]'
                }`}
        >
            <div className={`w-4 h-4 rounded-full transition-all ${enabled ? 'bg-white' : 'bg-white/20'}`} />
        </button>
    );
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
            <div className="flex items-center gap-3 mb-6">
                <MdNotificationsActive className="text-primary text-2xl" />
                <h3 className="text-white text-xl font-bold">Notification Settings</h3>
            </div>

            <div className="bg-[#291e1e]/30 p-6 rounded-xl border border-[#392828]/50">
                <div className="space-y-10">
                    <div>
                        <h4 className="text-sm font-bold tracking-wider text-white/80 mb-4">Email Notifications</h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-bold">Movie releases</div>
                                    <div className="text-xs text-white/50">Get notified when new blockbusters hit the screen</div>
                                </div>
                                <ToggleSwitch enabled={emailReleases} onChange={onEmailReleasesChange} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-bold">Promotional offers</div>
                                    <div className="text-xs text-white/50">Exclusive discounts and premiere access codes</div>
                                </div>
                                <ToggleSwitch enabled={emailPromos} onChange={onEmailPromosChange} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold tracking-wider text-white/80 mb-4">Push Notifications</h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-bold">Booking reminders</div>
                                    <div className="text-xs text-white/50">Never miss your showtime. Reminders 1 hour before</div>
                                </div>
                                <ToggleSwitch enabled={pushReminders} onChange={onPushRemindersChange} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-bold">Ticket alerts</div>
                                    <div className="text-xs text-white/50">Instant updates on ticket availability and seat upgrades</div>
                                </div>
                                <ToggleSwitch enabled={pushAlerts} onChange={onPushAlertsChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}