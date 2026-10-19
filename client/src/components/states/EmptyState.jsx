import { Inbox } from "lucide-react";

const EmptyState = ({
  title = "No data found",
  message = "There is notion to display yet",
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <Inbox className="text-secondary" size={32} aria-hidden="true" />

      <div className="space-y-1 text-center">
        <h3 className="text-primary font-semibold">{title}</h3>
        <p className="text-secondary text-sm">{message}</p>
      </div>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-accent text-primary rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
