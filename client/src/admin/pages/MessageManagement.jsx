import MessagesGrid from "../components/MessagesGrid";
import AdminPageHeader from "../components/AdminPageHeader";

const MessageManagement = () => {
  return (
    <div>
      {/* Header */}
      <AdminPageHeader title="Messages" />

      {/* Messages */}
      <div className="mt-8">
        <MessagesGrid />
      </div>
    </div>
  );
};

export default MessageManagement;
