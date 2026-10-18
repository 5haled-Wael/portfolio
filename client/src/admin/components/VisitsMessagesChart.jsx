import { useState } from "react";
import useVisitsTimeline from "../hooks/useVisitsTimeline";
import useMessages from "../hooks/useMessages";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const RANGES = [7, 30, 90];

const dateFormatter = (date) => {
  const validDate = new Date(date);
  return validDate.toLocaleDateString("en-CA", {
    timeZone: "Africa/Cairo",
  });
};

const VisitsMessagesChart = () => {
  const [days, setDays] = useState(() => {
    const saved = Number(localStorage.getItem("analyticsDays"));
    return RANGES.includes(saved) ? saved : 30;
  });

  const {
    timeline,
    loading: timelineLoading,
    error: timelineError,
  } = useVisitsTimeline(days);
  const {
    messages,
    loading: messagesLoading,
    error: messagesError,
  } = useMessages();

  const visitsByDate = {};
  const messagesByDate = {};

  timeline.forEach((visit) => {
    visitsByDate[visit.date] = visit.count;
  });

  messages.forEach((message) => {
    const date = dateFormatter(message.createdAt);
    messagesByDate[date] = (messagesByDate[date] || 0) + 1;
  });

  const chartData = Array.from({ length: days }, (_, i) => {
    const date = dateFormatter(
      // eslint-disable-next-line
      new Date(Date.now() - (days - 1 - i) * 24 * 60 * 60 * 1000),
    );

    return {
      date,
      visits: visitsByDate[date] ?? 0,
      messages: messagesByDate[date] ?? 0,
    };
  });

  const loading = timelineLoading || messagesLoading;
  const error = timelineError || messagesError;

  return (
    <div className="border-border bg-surface mt-8 rounded-2xl border p-6 shadow-sm">
      <div className="border-border flex items-center justify-between border-b pb-3">
        <h3 className="text-primary text-xl font-bold">Visits & Messages</h3>

        <div className="bg-accent-glow border-border flex gap-1 rounded-lg border p-1">
          {RANGES.map((range) => (
            <button
              key={range}
              onClick={() => {
                setDays(range);
                localStorage.setItem("analyticsDays", range);
              }}
              className={`cursor-pointer rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
                range === days
                  ? "bg-accent text-primary"
                  : "text-secondary hover:text-primary"
              }`}
            >
              {range}d
            </button>
          ))}
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <div className="mt-5">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--color-border)"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
              }}
              labelStyle={{ color: "var(--color-secondary)" }}
            />
            <Legend />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => date.slice(5, 10)}
              tick={{ fill: "var(--color-secondary)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              minTickGap={24}
            />
            <YAxis
              yAxisId="visits"
              orientation="left"
              allowDecimals={false}
              tick={{ fill: "#7b61ff", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="messages"
              orientation="right"
              allowDecimals={false}
              tick={{ fill: "#49de80", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Line
              dataKey="visits"
              stroke="#7b61ff"
              strokeWidth={2}
              yAxisId="visits"
              dot={false}
              type="monotone"
            />
            <Line
              dataKey="messages"
              stroke="#49de80"
              strokeWidth={2}
              yAxisId="messages"
              dot={false}
              type="monotone"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VisitsMessagesChart;
