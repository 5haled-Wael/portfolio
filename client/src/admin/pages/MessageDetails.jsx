import { useParams, useNavigate } from "react-router-dom";
import useUpdateMessage from "../hooks/useUpdateMessage";
import useMessage from "../hooks/useMessage";
import useDeleteMessage from "../hooks/useDeleteMessage";
import { useEffect } from "react";
import { toast } from "sonner";
import { FaReply } from "react-icons/fa";
import Swal from "sweetalert2";

const MessageDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate: updateMessage } = useUpdateMessage();
  const { message, isLoading, error } = useMessage(id);
  const { mutate: deleteMessage, isPending } = useDeleteMessage();

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

  const handleDeleteMessage = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
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
    });
  };

  return (
    <div>
      {/* Header & Back Button */}
      <div className="border-border mb-8 flex items-center gap-4 border-b pb-4">
        <button
          onClick={() => navigate("/admin/messages")}
          className="border-border text-secondary hover:text-accent hover:border-accent bg-surface flex cursor-pointer items-center justify-center rounded-lg border p-2 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-primary text-2xl font-bold">Message Details</h1>
      </div>

      {isLoading && <div className="text-secondary">Loading...</div>}
      {error && <div className="text-red-500">Error: {error.message}</div>}

      {/* Message */}
      {message && (
        <div className="border-border bg-surface rounded-lg border p-6">
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
                disabled={isPending}
                className="flex flex-1 cursor-pointer items-center justify-center rounded-lg bg-red-500/10 px-4 py-2 font-semibold text-red-400 transition-colors hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? "Deleting..." : "Delete"}
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
