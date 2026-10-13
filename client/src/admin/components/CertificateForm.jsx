import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const CertificateForm = ({ initialValues, submit, isPending }) => {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [issuer, setIssuer] = useState(initialValues?.issuer ?? "");
  const [order, setOrder] = useState(initialValues?.order ?? "");
  const [date, setDate] = useState(
    initialValues?.date ? initialValues.date.slice(0, 10) : "",
  );
  const [imagesFile, setImagesFile] = useState([]);
  const [imagesPreview, setImagesPreview] = useState(
    initialValues?.images?.map((image) => image.url) ?? [],
  );

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesFile(files);
    setImagesPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("issuer", issuer);
    formData.append("order", order);
    formData.append("date", date);
    imagesFile.forEach((file) => formData.append("images", file));
    submit(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          {/* Title */}
          <label htmlFor="title" className="text-secondary text-sm font-medium">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-border bg-surface text-primary focus:border-accent rounded-md border px-2 py-1 outline-none"
            type="text"
            id="title"
            name="title"
            required
          />

          {/* Issuer */}
          <label
            htmlFor="issuer"
            className="text-secondary text-sm font-medium"
          >
            Issuer
          </label>
          <input
            value={issuer}
            onChange={(e) => setIssuer(e.target.value)}
            className="border-border bg-surface text-primary focus:border-accent rounded-md border px-2 py-1 outline-none"
            type="text"
            id="issuer"
            name="issuer"
            required
          />

          {/* Order & Date */}
          <div className="flex gap-2">
            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="order"
                className="text-secondary text-sm font-medium"
              >
                Order
              </label>
              <input
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                type="number"
                className="border-border bg-surface text-primary focus:border-accent rounded-md border px-2 py-1 outline-none"
                id="order"
                name="order"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="date"
                className="text-secondary text-sm font-medium"
              >
                Date
              </label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border-border bg-surface text-primary focus:border-accent rounded-md border px-2 py-1 outline-none"
                type="date"
                id="date"
                name="date"
                required
              />
            </div>
          </div>

          {/* Images */}

          <div className="flex flex-col gap-3">
            <label
              htmlFor="images"
              className="text-secondary text-sm font-medium"
            >
              Certificate Images
            </label>

            <label
              htmlFor="images"
              className="border-border bg-surface hover:border-accent flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors"
            >
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
                Click to select certificate images
              </span>

              <span className="text-secondary text-xs">
                PNG, JPG or WEBP · Multiple images supported
              </span>
            </label>

            <input
              multiple
              onChange={handleImageChange}
              required={
                !initialValues?.images?.length && imagesFile.length === 0
              }
              id="images"
              type="file"
              accept="image/*"
              className="hidden"
            />

            {imagesPreview.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {imagesPreview.map((image, index) => (
                  <div
                    key={image}
                    className="border-border h-24 w-24 overflow-hidden rounded-lg border"
                  >
                    <img
                      src={image}
                      alt={`Certificate preview ${index + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

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
  );
};

export default CertificateForm;
