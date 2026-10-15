import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminLayout from "./admin/components/AdminLayout";
import AdminProjects from "./admin/pages/AdminProjects";
import AddProject from "./admin/pages/AddProject";
import { Toaster } from "sonner";
import EditProject from "./admin/pages/EditProject";
import AdminSkills from "./admin/pages/AdminSkills";
import AddSkill from "./admin/pages/AddSkill";
import EditSkill from "./admin/pages/EditSkill";
import AdminCertificates from "./admin/pages/AdminCertificates";
import AddCertificate from "./admin/pages/AddCertificate";
import EditCertificate from "./admin/pages/EditCertificate";
import ProfileManagement from "./admin/pages/ProfileManagement";
import MessageManagement from "./admin/pages/MessageManagement";
import MessageDetails from "./admin/pages/MessageDetails";

const App = () => {
  return (
    <>
      <Toaster />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="projects" element={<AdminProjects />} />
            <Route path="projects/new" element={<AddProject />} />
            <Route path="projects/edit/:id" element={<EditProject />} />

            <Route path="skills" element={<AdminSkills />} />
            <Route path="skills/new" element={<AddSkill />} />
            <Route path="skills/edit/:id" element={<EditSkill />} />

            <Route path="certificates" element={<AdminCertificates />} />
            <Route path="certificates/new" element={<AddCertificate />} />
            <Route path="certificates/edit/:id" element={<EditCertificate />} />

            <Route path="profile" element={<ProfileManagement />} />

            <Route path="messages" element={<MessageManagement />} />
            <Route path="messages/details/:id" element={<MessageDetails />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
