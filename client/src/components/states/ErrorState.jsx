import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorState = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-8"
      role="alert"
    >
      <AlertCircle className="text-red-500" size={28} aria-hidden="true" />
      <p className="text-secondary text-center text-sm">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="text-accent hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <RefreshCw size={16} aria-hidden="true" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
