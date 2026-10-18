import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const FeatureCard = ({ title, count, buttonText, loading, error, path }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface border-border hover:border-accent flex flex-col items-center gap-3 rounded-xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {loading && <div className="text-secondary">Loading...</div>}
      {error && <div className="text-red-500">Error: {error.message}</div>}
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
  );
};

export default FeatureCard;
