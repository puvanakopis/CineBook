type LoadingProps = {
  message?: string;
  fullHeight?: boolean;
  inline?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export default function Loading({
  message = 'Loading ...',
  fullHeight = true,
  inline = false,
  size = 'md',
}: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-12 w-12 border-t-2 border-b-2',
    lg: 'h-16 w-16 border-t-4 border-b-4',
  };

  const containerClasses = inline
    ? 'flex items-center gap-2'
    : `flex flex-col items-center justify-center ${fullHeight ? 'min-h-[90vh]' : 'py-12'} gap-4`;

  return (
    <div className={containerClasses}>
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-primary`}></div>
      {message && !inline && (
        <p className="text-slate-500 dark:text-[#b99d9d] animate-pulse font-medium">
          {message}
        </p>
      )}
      {message && inline && (
        <span className="text-slate-500 dark:text-[#b99d9d] font-medium text-sm">
          {message}
        </span>
      )}
    </div>
  );
}