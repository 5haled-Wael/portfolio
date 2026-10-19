import AdminProjectsGrid from "../components/AdminProjectsGrid";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminButton from "../components/AdminButton";
import { PlusCircle } from "lucide-react";

const AdminProjects = () => {
  return (
    <section className="flex flex-col gap-6">
      <AdminPageHeader title="Projects">
        <AdminButton path="/admin/projects/new" icon={PlusCircle}>
          Add New Project
        </AdminButton>
      </AdminPageHeader>

      <AdminProjectsGrid />
    </section>
  );
};

export default AdminProjects;
