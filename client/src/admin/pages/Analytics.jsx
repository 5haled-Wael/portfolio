import VisitsMessagesChart from "../components/VisitsMessagesChart";
import ProjectsByTechChart from "../components/ProjectsByTechChart";
import MessagesStatusChart from "../components/MessagesStatusChart";

const Analytics = () => {
  return (
    <div>
      {/* Header */}
      <div className="border-border flex items-center justify-between border-b pb-4">
        <h1 className="text-accent border-border text-3xl font-bold">
          Analytics
        </h1>
      </div>

      <VisitsMessagesChart />

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ProjectsByTechChart />
        <MessagesStatusChart />
      </div>
    </div>
  );
};

export default Analytics;
