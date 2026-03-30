import { ProfileSidebar } from "@/components/Sidebar";


export default function ProfilePage() {
  return (
    <div className="flex flex-1 w-full mx-auto">
      <ProfileSidebar />
      <main className="flex-1 p-6 md:p-10 lg:px-16 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-10">
         
        </div>
      </main>
    </div>
  );
}