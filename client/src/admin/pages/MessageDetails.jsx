import { useParams, useNavigate } from "react-router-dom";
import useUpdateMessage from "../hooks/useUpdateMessage";
import useMessage from "../hooks/useMessage";
import useDeleteMessage from "../hooks/useDeleteMessage";
import { useEffect } from "react";
import { toast } from "sonner";
import { FaReply } from "react-icons/fa";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminButton from "../components/AdminButton";
import LoadingState from "../../components/states/LoadingState";
import ErrorState from "../../components/states/ErrorState";
import { LoaderCircle } from "lucide-react";
import confirmDelete from "../utils/confirmDelete";

const MessageDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate: updateMessage } = useUpdateMessage();
  const { message, loading, error, refetch } = useMessage(id);
  const { mutate: deleteMessage, isPending: isDeleting } = useDeleteMessage();

  useEffect(() => {
    if (message && !message.isRead) {
      updateMessage(
        {
          id,
          data: { isRead: true },
        },
        {
          onError: (error) => console.log(error),
        },
      );
    }
  }, [message, id, updateMessage]);

  const handleDeleteMessage = async () => {
    const isConfirmed = await confirmDelete();

    if (!isConfirmed) return;

    deleteMessage(
      { id },
      {
        onSuccess: () => {
          toast.success("Message deleted successfully!");
          navigate("/admin/messages");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to delete message");
        },
      },
    );
  };

  return (
    <div>
      {/* Header & Back Button */}
      <AdminPageHeader title="Message Details">
        <AdminButton path="/admin/messages" />
      </AdminPageHeader>

      {loading && <LoadingState />}

      {!loading && error && (
        <ErrorState message={error.message} onRetry={refetch} />
      )}

      {!loading && !error && message && (
        <div className="border-border bg-surface mt-8 rounded-lg border p-6">
          <div className="flex flex-col gap-4">
            {/* Name & Email */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
              <h3 className="text-primary text-2xl font-bold">
                {message.name}
              </h3>
              <h4 className="text-secondary text-sm">{message.email}</h4>
            </div>

            <hr className="border-border" />

            {/* Subject & Date */}
            <div className="flex items-start justify-between gap-4">
              <p className="text-primary text-lg font-semibold">
                {message.subject}
              </p>

              <div className="text-secondary shrink-0 font-mono text-xs">
                {message.createdAt.slice(0, 10)}
              </div>
            </div>

            {/* Message */}
            <div className="bg-background border-border rounded-lg border p-4">
              <p className="text-primary text-base leading-relaxed whitespace-pre-wrap">
                {message.message}
              </p>
            </div>

            {/* Delete & Reply */}
            <div className="mt-auto flex items-center gap-3">
              <button
                onClick={handleDeleteMessage}
                type="button"
                disabled={isDeleting}
                className="flex flex-1 cursor-pointer items-center justify-center rounded-lg bg-red-500/10 px-4 py-2 font-semibold text-red-400 transition-colors hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? <LoaderCircle /> : "Delete"}
              </button>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(message.email)}&su=${encodeURIComponent(`Re: ${message.subject}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent-glow text-primary hover:bg-accent flex flex-1 items-center justify-center gap-3 rounded-lg px-4 py-2 font-semibold transition-colors"
              >
                Reply
                <FaReply />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageDetails;
