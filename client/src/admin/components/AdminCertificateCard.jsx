import { useState } from "react";
import useDeleteCertificate from "../hooks/useDeleteCertificate";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";

const AdminCertificateCard = ({ certificate }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { mutate: deleteCertificate } = useDeleteCertificate();
  const navigate = useNavigate();

  const handleDeleteCertificate = (id) => {
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
        deleteCertificate(id, {
          onSuccess: () => {
            toast.success("Certificate deleted successfully!");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        });
    });
  };

  return (
    <div className="bg-surface border-border hover:border-accent rounded-xl border p-3 shadow-md transition-colors">
      <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-lg bg-black/5">
        {certificate.images.length > 1 && (
          <div className="absolute inset-0 z-10 flex items-center justify-between px-2">
            <button
              type="button"
              aria-label="Previous image"
              className="rounded-full bg-black/50 p-1 text-white transition hover:bg-black/75"
              onClick={() =>
                setCurrentImage(
                  (currentImage - 1 + certificate.images.length) %
                    certificate.images.length,
                )
              }
            >
              <ChevronLeft size={32} aria-hidden="true" />
            </button>

            <button
              type="button"
              aria-label="Next image"
              className="rounded-full bg-black/50 p-1 text-white transition hover:bg-black/75"
              onClick={() =>
                setCurrentImage((currentImage + 1) % certificate.images.length)
              }
            >
              <ChevronRight size={32} aria-hidden="true" />
            </button>
          </div>
        )}
        <img
          src={certificate.images[currentImage].url}
          alt={certificate.title}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col gap-2 px-4 pt-4 pb-5">
        <div className="flex flex-col items-center gap-2">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase">
            {certificate.issuer}
          </p>

          <h3
            className="line-clamp-2 text-lg leading-snug font-bold"
            title={certificate.title}
          >
            {certificate.title}
          </h3>
        </div>

        <div className="border-border mt-2 flex items-center justify-between border-t pt-3">
          <time dateTime={certificate.date} className="text-sm text-gray-500">
            {new Date(certificate.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                navigate(`/admin/certificates/edit/${certificate._id}`)
              }
              className="rounded-lg bg-blue-500/10 px-4 py-2 text-sm text-blue-400 transition-colors hover:bg-blue-500 hover:text-white"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => handleDeleteCertificate(certificate._id)}
              className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500 hover:text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCertificateCard;
