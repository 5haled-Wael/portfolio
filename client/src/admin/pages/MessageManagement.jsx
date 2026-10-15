import MessagesGrid from "../components/MessagesGrid";

const MessageManagement = () => {
  return (
    <div>
      {/* Header */}
      <div className="border-border flex items-center justify-between border-b pb-4">
        <h1 className="text-accent border-border text-3xl font-bold">
          Messages
        </h1>
      </div>

      {/* Messages */}
      <MessagesGrid />
    </div>
  );
};

export default MessageManagement;
