import { useNavigate } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import useCreateProject from "../hooks/useCreateProject";
import { toast } from "sonner";

const AddProject = () => {
  const { mutate: createProject, isPending } = useCreateProject();
  const navigate = useNavigate();

  const handleCreate = (formData) => {
    createProject(formData, {
      onSuccess: () => {
        toast.success("Project created successfully!");
        navigate("/admin/projects");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
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
        <h1 className="text-accent text-2xl font-bold">Add New Project</h1>
      </div>

      {/* Form */}
      <div className="border-border bg-surface rounded-xl border p-6 shadow-sm">
        <ProjectForm
          onSubmit={handleCreate}
          isPending={isPending}
          submitLabel="Create"
        />
      </div>
    </section>
  );
};

export default AddProject;
