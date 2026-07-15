export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
    >
      <p>{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 text-xs font-medium text-red-200 underline hover:text-white"
        >
          Try again
        </button>
      )}
    </div>
  );
}
