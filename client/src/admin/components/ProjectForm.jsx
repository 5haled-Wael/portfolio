import { useState } from "react";
import { toast } from "sonner";

const ProjectForm = ({
  onSubmit,
  initialValues,
  isPending = false,
  submitLabel = "Submit",
}) => {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );
  const [github, setGithub] = useState(initialValues?.githubUrl ?? "");
  const [live, setLive] = useState(initialValues?.liveUrl ?? "");
  const [order, setOrder] = useState(initialValues?.order ?? "");
  const [featured, setFeatured] = useState(initialValues?.featured ?? false);
  const [tags, setTags] = useState(initialValues?.tags ?? []);
  const [tagsInput, setTagsInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    initialValues?.image?.url ?? null,
  );

  const addTag = () => {
    const value = tagsInput.trim();

    if (!value) return;

    if (tags.some((tag) => tag.toLowerCase() === value.toLowerCase())) return;

    setTags((prevTags) => [...prevTags, value]);
    setTagsInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (tags.length === 0) {
      toast.error("Add at least one tag");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("githubUrl", github);
    formData.append("liveUrl", live);
    formData.append("tags", JSON.stringify(tags));
    if (order !== "") formData.append("order", order);
    formData.append("featured", featured);
    if (imageFile) formData.append("image", imageFile);

    onSubmit(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <label htmlFor="title" className="text-secondary text-sm font-medium">
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

          <label
            htmlFor="description"
            className="text-secondary text-sm font-medium"
          >
            Description
          </label>
          <textarea
            className="border-border bg-surface text-primary focus:border-accent resize-none rounded-md border px-2 py-2 outline-none"
            id="description"
            name="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {/* Links */}
          <div className="flex gap-2">
            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="github"
                className="text-secondary text-sm font-medium"
              >
                Github URL
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

            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="live"
                className="text-secondary text-sm font-medium"
              >
                Live URL
              </label>
              <input
                className="border-border bg-surface text-primary focus:border-accent rounded-md border px-2 py-1 outline-none"
                type="text"
                id="live"
                name="live"
                value={live}
                onChange={(e) => setLive(e.target.value)}
              />
            </div>
          </div>

          {/* Order & Featured */}
          <div className="flex gap-2">
            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="order"
                className="text-secondary text-sm font-medium"
              >
                Order
              </label>
              <input
                className="border-border bg-surface text-primary focus:border-accent rounded-md border px-2 py-1 outline-none"
                type="number"
                id="order"
                name="order"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="featured"
                className="text-secondary text-sm font-medium"
              >
                Featured
              </label>
              <input
                className="border-border bg-surface text-primary focus:border-accent h-full rounded-md border px-2 py-1 outline-none"
                type="checkbox"
                id="featured"
                name="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="tags"
              className="text-secondary text-sm font-medium"
            >
              Tags
            </label>
            <div className="flex gap-2">
              <input
                className="border-border bg-surface text-primary focus:border-accent flex-5 rounded-md border px-2 py-1 outline-none"
                type="text"
                id="tags"
                name="tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="bg-accent text-primary hover:bg-accent/80 flex-1 rounded-lg px-4 py-2 font-semibold transition-colors"
                type="button"
                onClick={addTag}
              >
                Add Tag
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-accent/10 text-accent flex items-center justify-between gap-2 rounded-full px-4 py-1.5 text-xs"
                >
                  {tag}

                  <button
                    type="button"
                    onClick={() =>
                      setTags((prevTags) => prevTags.filter((t) => t !== tag))
                    }
                  >
                    <svg
                      className="text-accent/60 hover:text-red-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="image"
              className="text-secondary text-sm font-medium"
            >
              Project Image
            </label>

            <div className="border-border bg-surface hover:border-accent/50 relative mx-auto flex aspect-square w-full max-w-xs cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors">
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                required={!imagePreview}
              />

              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <div className="text-secondary flex flex-col items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  <span className="text-sm font-medium">
                    Click or drag image to upload
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="bg-accent text-primary hover:bg-accent/80 rounded-lg px-4 py-2 font-semibold transition-colors"
          >
            {isPending ? "Submitting..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
