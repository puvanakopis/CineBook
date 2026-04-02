'use client';

import { DashboardHeader } from './_components/DashboardHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden">
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-8 pb-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
