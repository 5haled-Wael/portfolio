import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AdminButton = ({ path, children = "Back", icon: Icon = ArrowLeft }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(path)}
      className="bg-accent text-primary hover:bg-accent/80 flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-colors"
    >
      <Icon size={18} />
      {children}
    </button>
  );
};

export default AdminButton;
