import { LoaderCircle } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="flex items-center justify-center gap-2 py-8" role="status">
      <LoaderCircle
        className="text-accent animate-spin"
        size={24}
        aria-hidden="true"
      />
      <span className="text-secondary">Loading...</span>
    </div>
  );
};

export default LoadingState;
