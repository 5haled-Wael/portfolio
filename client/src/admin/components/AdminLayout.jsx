import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="bg-background flex h-screen flex-col overflow-hidden md:flex-row">
      <Sidebar />

      <main className="min-h-0 min-w-0 flex-1 overflow-y-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
