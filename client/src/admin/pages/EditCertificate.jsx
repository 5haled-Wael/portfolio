import { useNavigate, useParams } from "react-router-dom";
import CertificateForm from "../components/CertificateForm";
import useCertificate from "../hooks/useCertificate";
import useUpdateCertificate from "../hooks/useUpdateCertificate";
import { toast } from "sonner";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminButton from "../components/AdminButton";
import LoadingState from "../../components/states/LoadingState";
import ErrorState from "../../components/states/ErrorState";

const EditCertificate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { certificate, loading, error, refetch } = useCertificate(id);
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
      <AdminPageHeader title="Edit Certificate">
        <AdminButton path="/admin/certificates" />
      </AdminPageHeader>

      {/* Form */}
      <div className="border-border bg-surface mt-8 rounded-xl border p-6 shadow-sm">
        {loading && <LoadingState />}

        {!loading && error && (
          <ErrorState message={error.message} onRetry={refetch} />
        )}

        {!loading && !error && certificate && (
          <CertificateForm
            key={certificate._id}
            initialValues={certificate}
            onSubmit={handleUpdate}
            isPending={isPending}
            submitLabel="Save Changes"
          />
        )}
      </div>
    </section>
  );
};

export default EditCertificate;
