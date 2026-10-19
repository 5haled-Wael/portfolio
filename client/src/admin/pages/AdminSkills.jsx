import { useNavigate } from "react-router-dom";
import useSkills from "../../hooks/useSkills";
import useDeleteSkill from "../hooks/useDeleteSkill";
import { toast } from "sonner";
import Swal from "sweetalert2";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminButton from "../components/AdminButton";
import LoadingState from "../../components/states/LoadingState";
import ErrorState from "../../components/states/ErrorState";
import EmptyState from "../../components/states/EmptyState";
import { PlusCircle } from "lucide-react";

const AdminSkills = () => {
  const { skills, loading, error, refetch } = useSkills();
  const navigate = useNavigate();
  const { mutate: deleteSkill } = useDeleteSkill();

  const handleDeleteSkill = (id) => {
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
        deleteSkill(id, {
          onSuccess: () => {
            toast.success("Skill deleted successfully!");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        });
    });
  };

  return (
    <div>
      {/* Header & Back Button */}
      <AdminPageHeader title="Skills">
        <AdminButton path="/admin/skills/new" icon={PlusCircle}>
          Add New Skill
        </AdminButton>
      </AdminPageHeader>

      {loading && <LoadingState />}
      {!loading && error && (
        <ErrorState message={error.message} onRetry={refetch} />
      )}

      {!loading && !error && skills.length === 0 && (
        <EmptyState
          title="No Skills Yet"
          message="Skills are the backbone of your portfolio. Add some to get started."
          actionLabel="Add New Skill"
          onAction={() => navigate("/admin/skills/new")}
        />
      )}

      {!loading && !error && skills.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="border-border bg-surface hover:border-accent flex items-center gap-4 rounded-2xl border p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="h-10 w-10 shrink-0 object-contain"
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-primary truncate font-semibold">
                  {skill.name}
                </h3>
                <p className="text-secondary truncate text-xs tracking-wide uppercase">
                  {skill.type}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2">
                <button
                  onClick={() => navigate(`/admin/skills/edit/${skill._id}`)}
                  type="button"
                  className="cursor-pointer rounded-lg bg-blue-500/10 px-3 py-1.5 text-sm text-blue-400 transition-colors hover:bg-blue-500 hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSkill(skill._id)}
                  type="button"
                  className="cursor-pointer rounded-lg bg-red-500/10 px-3 py-1.5 text-sm text-red-400 transition-colors hover:bg-red-500 hover:text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSkills;
