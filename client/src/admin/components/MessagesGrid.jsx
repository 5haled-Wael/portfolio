import useMessages from "../hooks/useMessages";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import LoadingState from "../../components/states/LoadingState";
import ErrorState from "../../components/states/ErrorState";
import EmptyState from "../../components/states/EmptyState";

const MessagesGrid = () => {
  const { messages, loading, error, refetch } = useMessages();

  return (
    <div>
      {loading && <LoadingState />}

      {!loading && error && (
        <ErrorState message={error.message} onRetry={refetch} />
      )}

      {!loading && !error && messages.length === 0 && (
        <EmptyState
          title="No Messages Yet"
          message="Messages from your portfolio contact form will appear here."
        />
      )}

      {!loading && !error && messages.length > 0 && (
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {messages
            .toSorted((a, b) => Number(a.isRead) - Number(b.isRead))
            .map((message) => (
              <Link
                to={`/admin/messages/details/${message._id}`}
                key={message._id}
                className="group border-border bg-surface hover:border-accent flex cursor-pointer flex-col gap-3 rounded-lg border p-6 transition-colors"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-primary truncate text-lg font-bold">
                      {message.name}
                    </h3>

                    <div className="shrink-0">
                      {message.isRead ? (
                        <div className="flex items-center gap-2">
                          <span className="text-secondary font-mono text-xs">
                            Read
                          </span>
                          <div className="h-2 w-2 rounded-full bg-[#49de80] shadow-[0_0_6px_#49de80]" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-secondary font-mono text-xs">
                            Unread
                          </span>
                          <div className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_6px_#fb2c36]" />
                        </div>
                      )}
                    </div>
                  </div>
                  <h4 className="text-secondary truncate text-xs">
                    {message.email}
                  </h4>
                </div>

                <hr className="border-border" />

                <div className="flex flex-col gap-1">
                  <p className="text-primary truncate text-sm font-semibold">
                    {message.subject}
                  </p>

                  <p className="text-secondary line-clamp-2 text-sm leading-relaxed">
                    {message.message}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <div className="text-secondary font-mono text-xs">
                    {message.createdAt.slice(0, 10)}
                  </div>

                  <FaArrowRightLong className="text-secondary group-hover:text-accent transition-colors" />
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default MessagesGrid;
