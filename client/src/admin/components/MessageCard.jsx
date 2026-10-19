import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const MessageCard = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        onClick={() => navigate(`/admin/messages/details/${message._id}`)}
        className="bg-accent-glow hover:bg-surface border-border flex cursor-pointer flex-col gap-2 rounded-lg border p-4 shadow-sm transition-colors"
      >
        {/* Name & Subject */}
        <div className="flex items-center justify-between gap-4">
          {/* Name & Is read */}
          <div className="flex min-w-0 items-center gap-3">
            {message.isRead ? (
              <div className="flex shrink-0 items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#49de80] shadow-[0_0_6px_#49de80]" />
              </div>
            ) : (
              <div className="flex shrink-0 items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_6px_#fb2c36]" />
              </div>
            )}
            <h1 className="text-primary truncate text-lg font-bold">
              {message.name}
            </h1>
          </div>
          <p className="text-secondary max-w-[50%] shrink-0 truncate font-mono text-sm">
            {message.subject}
          </p>
        </div>

        <div className="text-secondary pl-5 text-xs">
          {formatDistanceToNow(new Date(message.createdAt), {
            addSuffix: true,
          })}
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
