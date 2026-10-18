import useProfile from "../../hooks/useProfile";
import useProjects from "../../hooks/useProjects";
import useSkills from "../../hooks/useSkills";
import useCertificates from "../../hooks/useCertificates";
import useVisits from "../hooks/useVisits";
import useMessages from "../hooks/useMessages";
import FeatureCard from "../components/FeatureCard";
import MessageCard from "../components/MessageCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = useProfile();
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
  } = useProjects();
  const { skills, loading: skillsLoading, error: skillsError } = useSkills();
  const {
    certificates,
    loading: certificatesLoading,
    error: certificatesError,
  } = useCertificates();
  const {
    messages,
    isLoading: messagesLoading,
    error: messagesError,
  } = useMessages();
  const { visits, isLoading: visitsLoading, error: visitsError } = useVisits();

  return (
    <div>
      <div className="border-border flex items-center justify-between border-b pb-4">
        <h1 className="text-accent border-border text-3xl font-bold">
          Dashboard
        </h1>
        <p className="text-secondary">Welcome back, {profile?.name}!</p>
      </div>

      {profileLoading && <div className="text-secondary">Loading...</div>}
      {profileError && (
        <div className="text-red-500">Error: {profileError.message}</div>
      )}

      {/* Feature Cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {/* Visits */}
        <FeatureCard
          title="Visits"
          count={visits?.total}
          path="/admin/analytics"
          buttonText="View All"
          loading={visitsLoading}
          error={visitsError}
        />

        {/* Projects */}
        <FeatureCard
          title="Projects"
          count={projects?.length}
          path="/admin/projects"
          buttonText="View All"
          loading={projectsLoading}
          error={projectsError}
        />

        {/* Skills */}
        <FeatureCard
          title="Skills"
          count={skills?.length}
          path="/admin/skills"
          buttonText="View All"
          loading={skillsLoading}
          error={skillsError}
        />

        {/* Certificates */}
        <FeatureCard
          title="Certificates"
          count={certificates?.length}
          path="/admin/certificates"
          buttonText="View All"
          loading={certificatesLoading}
          error={certificatesError}
        />

        {/* Messages */}
        <FeatureCard
          title="Messages"
          count={messages?.length}
          path="/admin/messages"
          buttonText="View All"
          loading={messagesLoading}
          error={messagesError}
        />
      </div>

      {/* Message & Quick Actions */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Recent Messages */}
        <div className="border-border bg-surface rounded-2xl border p-6 shadow-sm lg:col-span-2">
          <h3 className="text-primary border-border border-b pb-3 text-xl font-bold">
            Recent Messages
          </h3>
          <p className="text-secondary mt-3 text-sm font-medium">
            <span className="text-accent font-bold">
              {messages?.filter((message) => !message.isRead).length}
            </span>{" "}
            unread
          </p>

          <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {messages
              ?.toSorted(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
              )
              .slice(0, 4)
              .map((message) => (
                <MessageCard
                  key={message._id}
                  message={message}
                  loading={messagesLoading}
                  error={messagesError}
                />
              ))}
          </div>

          <button
            onClick={() => navigate("/admin/messages")}
            className="bg-accent text-primary hover:bg-accent/80 w-full cursor-pointer rounded-lg px-4 py-2.5 font-semibold transition-colors"
          >
            View All Messages
          </button>
        </div>

        {/* Quick Actions */}
        <div className="border-border bg-surface flex flex-col rounded-2xl border p-6 shadow-sm">
          <h3 className="text-primary border-border mb-4 border-b pb-3 text-xl font-bold">
            Quick Actions
          </h3>
          <div className="flex flex-1 flex-col gap-3">
            <button
              onClick={() => navigate("/admin/projects/new")}
              className="bg-accent-glow text-primary border-border hover:border-accent hover:bg-accent flex min-h-12 flex-1 cursor-pointer items-center justify-center rounded-xl border px-4 py-3 font-semibold transition-all duration-200 hover:-translate-y-0.5"
            >
              + Add New Project
            </button>
            <button
              onClick={() => navigate("/admin/skills/new")}
              className="bg-accent-glow text-primary border-border hover:border-accent hover:bg-accent flex min-h-12 flex-1 cursor-pointer items-center justify-center rounded-xl border px-4 py-3 font-semibold transition-all duration-200 hover:-translate-y-0.5"
            >
              + Add New Skill
            </button>
            <button
              onClick={() => navigate("/admin/certificates/new")}
              className="bg-accent-glow text-primary border-border hover:border-accent hover:bg-accent flex min-h-12 flex-1 cursor-pointer items-center justify-center rounded-xl border px-4 py-3 font-semibold transition-all duration-200 hover:-translate-y-0.5"
            >
              + Add New Certificate
            </button>
            <button
              onClick={() => navigate("/admin/profile")}
              className="text-secondary border-border hover:border-accent hover:text-accent flex min-h-12 flex-1 cursor-pointer items-center justify-center rounded-xl border border-dashed px-4 py-3 font-semibold transition-all duration-200 hover:-translate-y-0.5"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
