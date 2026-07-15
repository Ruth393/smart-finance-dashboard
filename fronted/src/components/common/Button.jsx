const variants = {
  primary:
    'bg-emerald-600 text-white hover:bg-emerald-500 focus-visible:ring-emerald-500',
  secondary:
    'bg-slate-800 text-slate-100 hover:bg-slate-700 focus-visible:ring-slate-500',
  ghost:
    'bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white focus-visible:ring-slate-500',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  return (
    <button
      type="button"
      className={[
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
