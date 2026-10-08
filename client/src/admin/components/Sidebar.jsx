import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Projects", path: "/admin/projects" },
    { name: "Skills", path: "/admin/skills" },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="bg-surface border-border hidden w-64 flex-col gap-4 border-r p-5 md:flex">
        <h1 className="text-accent mb-4 text-center text-2xl">Admin Panel</h1>
        {navLinks.map((navLink) => (
          <NavLink
            key={navLink.name}
            to={navLink.path}
            className={({ isActive }) =>
              `flex items-center justify-start gap-3 rounded-xl px-3 py-3 transition-colors ${isActive ? "bg-accent text-primary font-semibold" : "text-secondary hover:bg-background/50 hover:text-primary"}`
            }
          >
            {navLink.name}
          </NavLink>
        ))}

        <button
          className="mt-auto flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left text-red-400 transition-colors hover:bg-red-500/10"
          onClick={() => {
            logout();
            navigate("/admin/login");
          }}
        >
          Logout
        </button>
      </div>

      {/* Mobile View */}
      <div className="bg-surface border-border flex w-full items-center justify-between border-b p-4 md:hidden">
        <h1 className="text-accent text-lg font-bold">Admin Panel</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="text-primary bg-background/50 cursor-pointer rounded-lg p-2 text-xl"
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="bg-background fixed inset-0 z-50 flex flex-col p-6 md:hidden">
          {/* Close Button */}
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-accent text-xl font-bold">Menu</h1>
            <button
              onClick={() => setIsOpen(false)}
              className="text-primary bg-background/50 cursor-pointer rounded-lg p-2 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Mobile Nav Links */}
          <div className="flex flex-col gap-4">
            {navLinks.map((navLink) => (
              <NavLink
                key={navLink.name}
                to={navLink.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center justify-start gap-3 rounded-xl px-3 py-3 transition-colors ${isActive ? "bg-accent text-primary font-semibold" : "text-secondary hover:bg-background/50 hover:text-primary"}`
                }
              >
                {navLink.name}
                <span>→</span>
              </NavLink>
            ))}
          </div>

          {/* Logout Button */}
          <button
            className="mt-auto flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-red-500/10 py-4 text-center text-red-400 transition-colors hover:bg-red-500/20"
            onClick={() => {
              logout();
              navigate("/admin/login");
            }}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;
