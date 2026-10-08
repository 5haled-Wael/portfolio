import useProjects from "../../hooks/useProjects";
import useDeleteProject from "../hooks/useDeleteProject";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminProjectsGrid = () => {
  const { projects, loading, error } = useProjects();
  const { mutate: deleteProject } = useDeleteProject();
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (projects.length === 0)
    return <div>No projects found. Start adding some!</div>;

  const handleDeleteProject = (id) => {
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
        deleteProject(id, {
          onSuccess: () => {
            toast.success("Project deleted successfully!");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        });
    });
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <div
          key={project._id}
          className="group border-accent/20 bg-surface flex h-full flex-col rounded-xl border p-5 shadow-sm"
        >
          <div className="relative">
            <img
              src={project.image.url}
              alt={project.title}
              className="h-40 w-full rounded-lg object-cover object-top"
            />
          </div>

          <div className="mt-4 mb-4">
            <h3 className="truncate font-semibold">{project.title}</h3>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-accent/10 text-accent rounded-full px-2 py-0.5 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Manage Buttons */}
          <div className="border-border mt-auto flex gap-3 border-t pt-4">
            <button
              onClick={() => navigate(`/admin/projects/edit/${project._id}`)}
              className="flex-1 rounded-lg bg-blue-500/10 px-4 py-2 text-sm text-blue-400 transition-colors hover:bg-blue-500 hover:text-white"
            >
              Edit
            </button>

            <button
              onClick={() => handleDeleteProject(project._id)}
              className="flex-1 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500 hover:text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProjectsGrid;
