import { useNavigate, useParams } from "react-router-dom";
import SkillFrom from "../components/SkillForm";
import useSkill from "../hooks/useSkill";
import useUpdateSkill from "../hooks/useUpdateSkill";
import { toast } from "sonner";

const EditSkill = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: skill } = useSkill(id);
  const { mutate: updateSkill } = useUpdateSkill();

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
      <div className="border-border mb-8 flex items-center gap-4 border-b pb-4">
        <button
          onClick={() => navigate("/admin/skills")}
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
        <h1 className="text-accent text-2xl font-bold">Edit Skill</h1>
      </div>

      {/* Form */}
      <div className="border-border bg-surface rounded-xl border p-6 shadow-sm">
        <SkillFrom initialValues={skill} submit={handleSubmit} />
      </div>
    </section>
  );
};

export default EditSkill;
