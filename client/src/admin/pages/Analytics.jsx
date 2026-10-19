import VisitsMessagesChart from "../components/VisitsMessagesChart";
import ProjectsByTechChart from "../components/ProjectsByTechChart";
import MessagesStatusChart from "../components/MessagesStatusChart";
import AdminPageHeader from "../components/AdminPageHeader";

const Analytics = () => {
  return (
    <div>
      {/* Header */}
      <AdminPageHeader title="Analytics" />

      <VisitsMessagesChart />

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ProjectsByTechChart />
        <MessagesStatusChart />
      </div>
    </div>
  );
};

export default Analytics;
