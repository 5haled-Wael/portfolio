import { useNavigate } from "react-router-dom";
import useSkills from "../../hooks/useSkills";
import useDeleteSkill from "../hooks/useDeleteSkill";
import { toast } from "sonner";
import Swal from "sweetalert2";

const AdminSkills = () => {
  const { skills } = useSkills();
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
      <div className="border-border flex items-center justify-between border-b pb-4">
        <h1 className="text-accent border-border text-3xl font-bold">Skills</h1>

        <button
          onClick={() => navigate("/admin/skills/new")}
          className="bg-accent text-primary hover:bg-accent/80 rounded-lg px-4 py-2 font-semibold transition-colors"
        >
          + Add New Skill
        </button>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="flex items-center gap-4 rounded-2xl border border-gray-200 p-4 shadow-sm transition-colors"
          >
            <img
              src={skill.icon}
              alt={skill.name}
              className="h-9 w-9 shrink-0 object-contain"
              loading="lazy"
            />
            <div>
              <h3 className="font-semibold">{skill.name}</h3>
              <p className="text-sm text-gray-500">{skill.type}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate(`/admin/skills/edit/${skill._id}`)}
                className="rounded-lg bg-blue-500/10 px-4 py-2 text-sm text-blue-400 transition-colors hover:bg-blue-500 hover:text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteSkill(skill._id)}
                className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500 hover:text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSkills;
