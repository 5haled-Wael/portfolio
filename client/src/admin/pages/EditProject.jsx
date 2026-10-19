import { toast } from "sonner";
import ProjectForm from "../components/ProjectForm";
import useProject from "../hooks/useProject";
import useUpdateProject from "../hooks/useUpdateProject";
import { useNavigate, useParams } from "react-router-dom";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminButton from "../components/AdminButton";
import LoadingState from "../../components/states/LoadingState";
import ErrorState from "../../components/states/ErrorState";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { project, loading, error, refetch } = useProject(id);
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
      <AdminPageHeader title="Edit Project">
        <AdminButton path="/admin/projects" />
      </AdminPageHeader>

      {/* Form */}
      <div className="border-border bg-surface mt-8 rounded-xl border p-6 shadow-sm">
        {loading && <LoadingState />}

        {!loading && error && (
          <ErrorState message={error.message} onRetry={refetch} />
        )}

        {!loading && !error && project && (
          <ProjectForm
            key={project._id}
            initialValues={project}
            onSubmit={handleUpdate}
            isPending={isPending}
            submitLabel="Save Changes"
          />
        )}
      </div>
    </section>
  );
};

export default EditProject;
