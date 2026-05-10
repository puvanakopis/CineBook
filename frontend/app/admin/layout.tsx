'use client';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="w-full max-w-[1300px] mx-auto flex flex-col gap-8 py-10 px-4 lg:px-8">
        {children}
      </div>
    </main>
  );
}
