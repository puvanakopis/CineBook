'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { SettingsHeader } from './_components/SettingsHeader';
import { NotificationSettings } from './_components/NotificationSettings';
import { DisplayAccessibility } from './_components/DisplayAccessibility';
import { PrivacyData } from './_components/PrivacyData';
import { SettingsActions } from './_components/SettingsActions';

export default function SettingsPage() {
    const [emailReleases, setEmailReleases] = useState(true);
    const [emailPromos, setEmailPromos] = useState(false);
    const [pushReminders, setPushReminders] = useState(true);
    const [pushAlerts, setPushAlerts] = useState(true);
    const [dataSharing, setDataSharing] = useState(false);

    const handleSave = () => {
        console.log('Saving preferences:', {
            emailReleases,
            emailPromos,
            pushReminders,
            pushAlerts,
            dataSharing,
        });
    };

    const handleDiscard = () => {
        setEmailReleases(true);
        setEmailPromos(false);
        setPushReminders(true);
        setPushAlerts(true);
        setDataSharing(false);
    };

    return (
        <div className="flex flex-1 w-full mx-auto">
            <Sidebar />
            <main className="flex-1 p-6 md:p-10 lg:px-16 overflow-y-auto">
                <div className="max-w-6xl mx-auto space-y-10">
                    <SettingsHeader />

                    <div className="space-y-12">
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
                        <DisplayAccessibility />
                        <PrivacyData
                            dataSharing={dataSharing}
                            onDataSharingChange={setDataSharing}
                        />
                        <SettingsActions onSave={handleSave} onDiscard={handleDiscard} />
                    </div>
                </div>
            </main>
        </div>
    );
}