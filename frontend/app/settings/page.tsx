'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { SettingsHeader } from './_components/SettingsHeader';
import { NotificationSettings } from './_components/NotificationSettings';
import { PrivacyData } from './_components/PrivacyData';

export default function Settings() {
    const [emailReleases, setEmailReleases] = useState(true);
    const [emailPromos, setEmailPromos] = useState(false);
    const [pushReminders, setPushReminders] = useState(true);
    const [pushAlerts, setPushAlerts] = useState(true);
    const [dataSharing, setDataSharing] = useState(false);

    const handleDiscard = () => {
        setEmailReleases(true);
        setEmailPromos(false);
        setPushReminders(true);
        setPushAlerts(true);
        setDataSharing(false);
    };

    return (
        <div className="flex w-full min-h-screen bg-[#0b0909]">
            <Sidebar />
            <main className="flex-1 overflow-x-hidden">
                <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-16 space-y-20">
                    <SettingsHeader />

                    <div className="space-y-16">
                        <NotificationSettings
                            emailReleases={emailReleases}
                            onEmailReleasesChange={setEmailReleases}
                            emailPromos={emailPromos}
                            onEmailPromosChange={setEmailPromos}
                            pushReminders={pushReminders}
                            onPushRemindersChange={setPushReminders}
                            pushAlerts={pushAlerts}
                            onPushAlertsChange={setPushAlerts}
                        />
                        <PrivacyData
                            dataSharing={dataSharing}
                            onDataSharingChange={setDataSharing}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
