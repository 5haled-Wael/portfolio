import { toast } from "sonner";
import ProjectForm from "../components/ProjectForm";
import useProject from "../hooks/useProject";
import useUpdateProject from "../hooks/useUpdateProject";
import { useNavigate, useParams } from "react-router-dom";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: project, isLoading, error } = useProject(id);
  const { mutate: updateProject, isPending } = useUpdateProject();

  const handleUpdate = (formData) => {
    updateProject(
      { id, formData },
      {
        onSuccess: () => {
          toast.success("Project updated successfully!");
          navigate("/admin/projects");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <section>
      {/* Header & Back Button */}
      <div className="border-border mb-8 flex items-center gap-4 border-b pb-4">
        <button
          onClick={() => navigate("/admin/projects")}
          className="text-secondary hover:text-accent bg-surface flex items-center justify-center rounded-lg p-2 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-accent text-2xl font-bold">Edit Project</h1>
      </div>

      {/* Form */}
      <div className="border-border bg-surface rounded-xl border p-6 shadow-sm">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {project && (
          <ProjectForm
            key={project._id}
            initialValues={project}
            onSubmit={handleUpdate}
            isPending={isPending}
            submitLabel="Update"
          />
        )}
      </div>
    </section>
  );
};

export default EditProject;
