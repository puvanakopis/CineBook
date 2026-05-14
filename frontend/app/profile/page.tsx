import { Sidebar } from "@/components/Sidebar";
import { ProfileHero } from "./_components/ProfileHero";
import { PersonalInfoForm } from "./_components/PersonalInfoForm";
import { PreferencesSection } from "./_components/PreferencesSection";

export default function Profile() {
  return (
    <div className="flex w-full min-h-screen bg-[#0b0909]">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        <ProfileHero />
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-16 space-y-20">
          <PersonalInfoForm />
          <PreferencesSection />
        </div>
      </main>
    </div>
  );
}