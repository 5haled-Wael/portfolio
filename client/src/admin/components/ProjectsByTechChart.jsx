import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useProjects from "../../hooks/useProjects";
import LoadingState from "../../components/states/LoadingState";
import ErrorState from "../../components/states/ErrorState";
import EmptyState from "../../components/states/EmptyState";
import { useNavigate } from "react-router-dom";

const ProjectsByTechChart = () => {
  const { projects, loading, error, refetch } = useProjects();
  const navigate = useNavigate();
  const countByTag = {};

  projects.forEach((project) => {
    project.tags.forEach((tag) => {
      countByTag[tag.trim().toLowerCase()] =
        (countByTag[tag.trim().toLowerCase()] || 0) + 1;
    });
  });

  const chartData = Object.entries(countByTag)
    .map(([tag, count]) => ({
      tag,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return (
    <div className="border-border bg-surface rounded-2xl border p-6 shadow-sm">
      <h3 className="text-primary border-border border-b pb-3 text-xl font-bold">
        Projects by Technology
      </h3>

      {loading && <LoadingState />}

      {!loading && error && (
        <ErrorState message={error.message} onRetry={refetch} />
      )}

      {!loading && !error && chartData.length === 0 && (
        <EmptyState
          title="No Technology Data Yet"
          message="Add projects with technology tags to see your tech stack distribution here."
          actionLabel="Add Project"
          onAction={() => navigate("/admin/projects/new")}
        />
      )}

      {!loading && !error && chartData.length > 0 && (
        <ResponsiveContainer
          width="100%"
          height={Math.max(chartData.length * 40, 160)}
        >
          <BarChart data={chartData} layout="vertical">
            <XAxis
              type="number"
              allowDecimals={false}
              tick={{ fill: "var(--color-secondary)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="tag"
              width={80}
              tick={{ fill: "var(--color-secondary)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(tag) =>
                tag.charAt(0).toUpperCase() + tag.slice(1)
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
              }}
              labelStyle={{ color: "var(--color-secondary)" }}
              cursor={{ fill: "var(--color-border)", opacity: 0.3 }}
            />
            <Bar dataKey="count" fill="#7b61ff" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ProjectsByTechChart;
