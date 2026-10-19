import { useNavigate } from "react-router-dom";
import SkillForm from "../components/SkillForm";
import useCreateSkill from "../hooks/useCreateSkill";
import { toast } from "sonner";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminButton from "../components/AdminButton";

const AddSkill = () => {
  const navigate = useNavigate();
  const { mutate: createSkill, isPending } = useCreateSkill();

  const handleCreate = (formData) => {
    createSkill(formData, {
      onSuccess: () => {
        navigate("/admin/skills");
        toast.success("Skill created successfully!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <section>
      {/* Header & Back Button */}
      <AdminPageHeader title="Add Skill">
        <AdminButton path="/admin/skills" />
      </AdminPageHeader>

      {/* Form */}
      <div className="border-border bg-surface mt-8 rounded-xl border p-6 shadow-sm">
        <SkillForm
          onSubmit={handleCreate}
          isPending={isPending}
          submitLabel="Create"
        />
      </div>
    </section>
  );
};

export default AddSkill;
