type LoadingProps = {
  message?: string;
  inline?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

function Spinner({
  inline = false,
  size = 'md',
}: {
  inline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizes: Record<string, string> = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={`${inline ? '' : 'flex items-center justify-center'}`}>
      <div
        className={`${sizes[size]} border-primary border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
}

export default function Loading({
  message = 'Loading ...',
  inline = false,
  size = 'md',
}: LoadingProps) {
  if (inline) {
    return <Spinner inline size={size} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Spinner size={size} />

        <p className="text-text-secondary animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}