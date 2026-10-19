import { motion } from "framer-motion";

const PageLoader = ({ error = false, onRetry }) => {
  return (
    <motion.div
      className="bg-background fixed inset-0 z-9999 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col items-center gap-4">
        {error ? (
          <>
            <span className="text-primary text-lg font-semibold">
              Couldn't load the portfolio
            </span>

            <p className="text-secondary text-sm">
              Something went wrong while loading the page.
            </p>

            <button
              type="button"
              onClick={onRetry}
              className="bg-accent rounded-lg px-5 py-2 text-white transition-opacity hover:opacity-80"
            >
              Try Again
            </button>
          </>
        ) : (
          <>
            <motion.div
              className="border-border border-t-accent h-12 w-12 rounded-full border-4"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <span className="text-secondary text-sm">Loading portfolio...</span>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default PageLoader;
