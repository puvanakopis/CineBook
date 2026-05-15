type LoadingProps = {
  message?: string;
  fullHeight?: boolean;
};

export default function Loading({
  message = 'Loading ...',
  fullHeight = true,
}: LoadingProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${fullHeight ? 'min-h-[90vh]' : 'py-12'} gap-4`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      {message && (
        <p className="text-slate-500 dark:text-[#b99d9d] animate-pulse font-medium">
          {message}
        </p>
      )}
    </div>
  );
}