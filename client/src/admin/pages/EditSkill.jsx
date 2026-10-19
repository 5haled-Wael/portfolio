import { useNavigate, useParams } from "react-router-dom";
import SkillForm from "../components/SkillForm";
import useSkill from "../hooks/useSkill";
import useUpdateSkill from "../hooks/useUpdateSkill";
import { toast } from "sonner";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminButton from "../components/AdminButton";
import LoadingState from "../../components/states/LoadingState";
import ErrorState from "../../components/states/ErrorState";

const EditSkill = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { skill, loading, error, refetch } = useSkill(id);
  const { mutate: updateSkill, isPending } = useUpdateSkill();

  const handleSubmit = (formData) => {
    updateSkill(
      { id, formData },
      {
        onSuccess: () => {
          toast.success("Skill updated successfully!");
          navigate("/admin/skills");
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
      <AdminPageHeader title="Edit Skill">
        <AdminButton path="/admin/skills" />
      </AdminPageHeader>

      {loading && <LoadingState />}
      {!loading && error && (
        <ErrorState message={error.message} onRetry={refetch} />
      )}

      {/* Form */}
      {!loading && !error && skill && (
        <div className="border-border bg-surface mt-8 rounded-xl border p-6 shadow-sm">
          <SkillForm
            initialValues={skill}
            onSubmit={handleSubmit}
            isPending={isPending}
            submitLabel="Save Changes"
          />
        </div>
      )}
    </section>
  );
};

export default EditSkill;
