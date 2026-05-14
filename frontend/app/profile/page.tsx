"use client";

import { useContext, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ProfileHero } from "./_components/ProfileHero";
import { PersonalInfoForm } from "./_components/PersonalInfoForm";
import { PreferencesSection } from "./_components/PreferencesSection";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";

export default function Profile() {
  const { userInfo, fetchUserInfo, updateUserInfo } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const handleUpdate = async (data: any) => {
    try {
      await updateUserInfo(data);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
      console.error("Update profile error:", err);
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-[#0b0909]">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        <ProfileHero />
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-16 space-y-20">
          <PersonalInfoForm
            userData={userInfo}
            onUpdate={(data) => handleUpdate({ ...data, preferences: userInfo?.preferences })}
          />
          <PreferencesSection
            preferences={userInfo?.preferences}
            onUpdate={(data) => handleUpdate({
              firstName: userInfo?.firstName,
              lastName: userInfo?.lastName,
              phone: userInfo?.phone,
              preferences: data
            })}
          />
        </div>
      </main>
    </div>
  );
}