import { useEffect, useState } from "react";
import useProfile from "../../hooks/useProfile";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const ProfileManagement = () => {
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { profile, loading } = useProfile();

  const [name, setName] = useState(profile?.name);
  const [title, setTitle] = useState(profile?.title);
  const [subtitle, setSubtitle] = useState(profile?.subtitle);
  const [about, setAbout] = useState(profile?.about);
  const [email, setEmail] = useState(profile?.email);
  const [linkedin, setLinkedin] = useState(profile?.linkedin);
  const [github, setGithub] = useState(profile?.github);
  const [university, setUniversity] = useState(profile?.university);
  const [graduation, setGraduation] = useState(profile?.graduation);
  const [cv, setCv] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!profile) return;

    setName(profile.name ?? "");
    setTitle(profile.title ?? "");
    setSubtitle(profile.subtitle ?? "");
    setAbout(profile.about ?? "");
    setEmail(profile.email ?? "");
    setLinkedin(profile.linkedin ?? "");
    setGithub(profile.github ?? "");
    setUniversity(profile.university ?? "");
    setGraduation(profile.graduation ?? "");
  }, [profile]);

  useEffect(() => {
    if (!image) {
      setImagePreview(profile?.image?.url ?? "");
      return;
    }

    const previewUrl = URL.createObjectURL(image);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [image, profile?.image?.url]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("title", title);
    formData.append("email", email);
    formData.append("subtitle", subtitle);
    formData.append("linkedin", linkedin);
    formData.append("github", github);
    formData.append("university", university);
    formData.append("graduation", graduation);
    formData.append("about", about);
    if (cv) formData.append("cv", cv);
    if (image) formData.append("image", image);

    updateProfile(formData, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
      },
      onError: (error) => {
        toast.error(error.message ?? "Failed to update profile");
      },
    });
  };

  return (
    <div>
      <div className="border-border flex items-center justify-between border-b pb-4">
        <h1 className="text-accent border-border text-3xl font-bold">
          Profile
        </h1>
      </div>

      {loading && (
        <div className="flex h-screen w-screen items-center justify-center">
          Loading...
        </div>
      )}

      <div className="mt-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            {/* Name */}
            <label
              htmlFor="name"
              className="text-secondary text-sm font-medium"
            >
              Name
            </label>
            <input
              className="border-border bg-surface text-primary focus:border-accent rounded-md border px-2 py-1 outline-none"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* Email */}
            <label
              htmlFor="email"
              className="text-secondary text-sm font-medium"
            >
              Email
            </label>
            <input
              className="border-border bg-surface text-primary focus:border-accent rounded-md border px-2 py-1 outline-none"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Title & Subtitle */}
            <div className="flex gap-3">
              <div className="flex flex-1 flex-col gap-2">
                <label
                  htmlFor="title"
                  className="text-secondary text-sm font-medium"
                >
                  Title
                </label>
                <input
                  className="border-border bg-surface text-primary focus:border-accent rounded-md border px-2 py-1 outline-none"
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <label
                  htmlFor="subtitle"
                  className="text-secondary text-sm font-medium"
                >
                  Subtitle
                </label>
                <input
                  className="border-border bg-surface text-primary focus:border-accent rounded-md border px-2 py-1 outline-none"
                  type="text"
                  id="subtitle"
                  name="subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Linkedin & Github */}
            <div className="flex gap-3">
              <div className="flex flex-1 flex-col gap-2">
                <label
                  htmlFor="linkedin"
                  className="text-secondary text-sm font-medium"
                >
                  Linkedin
                </label>
                <input
                  className="border-border bg-surface text-primary focus:border-accent rounded-md border px-2 py-1 outline-none"
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <label
                  htmlFor="github"
                  className="text-secondary text-sm font-medium"
                >
                  Github
                </label>
                <input
                  className="border-border bg-surface text-primary focus:border-accent rounded-md border px-2 py-1 outline-none"
                  type="text"
                  id="github"
                  name="github"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </div>
            </div>

            {/* University & Graduation Year */}
            <div className="flex gap-3">
              <div className="flex flex-1 flex-col gap-2">
                <label
                  htmlFor="university"
                  className="text-secondary text-sm font-medium"
                >
                  University
                </label>
                <input
                  className="border-border bg-surface text-primary focus:border-accent rounded-md border px-2 py-1 outline-none"
                  type="text"
                  id="university"
                  name="university"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <label
                  htmlFor="graduation"
                  className="text-secondary text-sm font-medium"
                >
                  Graduation Year
                </label>
                <input
                  className="border-border bg-surface text-primary focus:border-accent rounded-md border px-2 py-1 outline-none"
                  type="Number"
                  id="graduation"
                  name="graduation"
                  value={graduation}
                  onChange={(e) => setGraduation(e.target.value)}
                />
              </div>
            </div>

            {/* About */}
            <label
              htmlFor="about"
              className="text-secondary text-sm font-medium"
            >
              About
            </label>
            <textarea
              className="border-border bg-surface text-primary focus:border-accent resize-none rounded-md border px-2 py-1 outline-none"
              id="about"
              name="about"
              rows={5}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              required
            />

            {/* CV */}
            <div className="flex items-center gap-2">
              <input
                className="border-border bg-surface text-primary focus:border-accent flex-7 cursor-pointer rounded-md border px-2 py-1 outline-none"
                type="file"
                id="cv"
                name="cv"
                onChange={(e) => setCv(e.target.files[0] ?? null)}
                accept="application/pdf"
              />

              <a
                href={profile?.cv?.url}
                target="_blank"
                rel="noreferrer"
                className="bg-surface text-primary hover:bg-surface/80 border-border flex-1 rounded-lg border px-4 py-2 text-center text-sm font-semibold transition-colors"
              >
                Show CV
              </a>
            </div>

            {/* Image */}
            <div className="flex items-center gap-2">
              <input
                className="border-border bg-surface text-primary focus:border-accent flex-7 cursor-pointer rounded-md border px-2 py-1 outline-none"
                type="file"
                id="image"
                name="image"
                onChange={(e) => setImage(e.target.files[0] ?? null)}
                accept="image/*"
              />
            </div>

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Profile preview"
                className="border-border h-32 w-32 rounded-lg border object-cover"
              />
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="bg-accent text-primary hover:bg-accent/80 flex items-center justify-center rounded-lg px-4 py-2 font-semibold transition-colors"
            >
              {isPending ? (
                <LoaderCircle className="animate-spin" size={18} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileManagement;
