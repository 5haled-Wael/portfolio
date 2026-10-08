import AdminProjectsGrid from "../components/AdminProjectsGrid";
import { useNavigate } from "react-router-dom";

const AdminProjects = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col gap-6">
      <div className="border-border flex items-center justify-between border-b pb-4">
        <h1 className="text-accent text-2xl font-bold">Manage Projects</h1>
        <button
          onClick={() => navigate("/admin/projects/new")}
          className="bg-accent text-primary hover:bg-accent/80 rounded-lg px-4 py-2 font-semibold transition-colors"
        >
          + Add New Project
        </button>
      </div>

      <AdminProjectsGrid />
    </section>
  );
};

export default AdminProjects;
