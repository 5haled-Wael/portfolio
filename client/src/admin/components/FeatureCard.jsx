import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import LoadingState from "../../components/states/LoadingState";
import ErrorState from "../../components/states/ErrorState";

const FeatureCard = ({
  title,
  count,
  buttonText,
  loading,
  error,
  path,
  refetch,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface border-border hover:border-accent flex flex-col items-center gap-3 rounded-xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {loading && <LoadingState />}

      {!loading && error && (
        <ErrorState message={error.message} onRetry={refetch} />
      )}

      {!loading && !error && (
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-secondary text-sm font-semibold tracking-widest uppercase">
            {title}
          </h2>
          <p className="text-accent text-5xl font-bold">{count}</p>
          <button
            onClick={() => navigate(path)}
            className="bg-accent-glow group text-primary hover:bg-accent mt-auto flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg px-4 py-2.5 font-semibold transition-colors"
          >
            {buttonText}
            <FaArrowRightLong className="text-secondary group-hover:text-primary transition-all group-hover:translate-x-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
