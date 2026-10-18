import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import useMessages from "../hooks/useMessages";

const MessagesStatusChart = () => {
  const { messages, loading, error } = useMessages();

  const chartData = [
    {
      name: "Read",
      count: messages.filter((message) => message.isRead).length,
      fill: "#49de80",
    },
    {
      name: "Unread",
      count: messages.filter((message) => !message.isRead).length,
      fill: "#fb2c36",
    },
  ];

  return (
    <div className="border-border bg-surface rounded-2xl border p-6 shadow-sm">
      <h3 className="text-primary border-border border-b pb-3 text-xl font-bold">
        Messages Status
      </h3>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {!loading && messages.length === 0 ? (
        <p className="text-secondary mt-3 text-sm font-medium">
          No messages found
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              stroke="none"
              paddingAngle={3}
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
              }}
              labelStyle={{ color: "var(--color-secondary)" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MessagesStatusChart;
