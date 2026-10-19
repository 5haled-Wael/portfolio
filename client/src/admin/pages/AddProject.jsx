import { useNavigate } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import useCreateProject from "../hooks/useCreateProject";
import { toast } from "sonner";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminButton from "../components/AdminButton";

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
      <AdminPageHeader title="Add Project">
        <AdminButton path="/admin/projects" />
      </AdminPageHeader>

      {/* Form */}
      <div className="border-border bg-surface mt-8 rounded-xl border p-6 shadow-sm">
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
