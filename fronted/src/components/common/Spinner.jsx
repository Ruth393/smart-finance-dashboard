export default function Spinner({ size = 'md', className = '' }) {
  const sizeClass = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }[size];

  return (
    <div
      role="status"
      aria-label="Loading"
      className={[
        'animate-spin rounded-full border-2 border-slate-600 border-t-emerald-500',
        sizeClass,
        className,
      ].join(' ')}
    />
  );
}
