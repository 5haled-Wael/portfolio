import { useNavigate, useParams } from "react-router-dom";
import CertificateForm from "../components/CertificateForm";
import useCertificate from "../hooks/useCertificate";
import useUpdateCertificate from "../hooks/useUpdateCertificate";
import { toast } from "sonner";

const EditCertificate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: certificate, isLoading, error } = useCertificate(id);
  const { mutate: updateCertificate, isPending } = useUpdateCertificate();

  const handleUpdate = (formData) => {
    updateCertificate(
      { id, formData },
      {
        onSuccess: () => {
          toast.success("Certificate updated successfully!");
          navigate("/admin/certificates");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <section>
      {/* Header & Back Button */}
      <div className="border-border mb-8 flex items-center gap-4 border-b pb-4">
        <button
          className="text-secondary hover:text-accent bg-surface flex items-center justify-center rounded-lg p-2 transition-colors"
          onClick={() => navigate("/admin/certificates")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-accent text-2xl font-bold">Edit Certificate</h1>
      </div>

      {/* Form */}
      <div className="border-border bg-surface rounded-xl border p-6 shadow-sm">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {certificate && (
          <CertificateForm
            key={certificate._id}
            initialValues={certificate}
            submit={handleUpdate}
            isPending={isPending}
          />
        )}
      </div>
    </section>
  );
};

export default EditCertificate;
