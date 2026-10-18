import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useProjects from "../../hooks/useProjects";

const ProjectsByTechChart = () => {
  const { projects, loading, error } = useProjects();

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
    .sort((a, b) => b.count - a.count);

  return (
    <div className="border-border bg-surface rounded-2xl border p-6 shadow-sm">
      <h3 className="text-primary border-border border-b pb-3 text-xl font-bold">
        Projects by Technology
      </h3>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {projects.length === 0 ? (
        <p className="text-secondary mt-3 text-sm font-medium">
          No projects found
        </p>
      ) : (
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
