import { useNavigate } from "react-router-dom";
import CertificateForm from "../components/CertificateForm";
import useCreateCertificate from "../hooks/useCreateCertificate";
import { toast } from "sonner";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminButton from "../components/AdminButton";

const AddCertificate = () => {
  const navigate = useNavigate();
  const { mutate: createCertificate, isPending } = useCreateCertificate();

  const handleCreate = (formData) => {
    createCertificate(formData, {
      onSuccess: () => {
        toast.success("Certificate created successfully!");
        navigate("/admin/certificates");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <section>
      {/* Header & Back Button */}
      <AdminPageHeader title="Add Certificate">
        <AdminButton path="/admin/certificates" />
      </AdminPageHeader>

      {/* Form */}
      <div className="border-border bg-surface mt-8 rounded-xl border p-6 shadow-sm">
        <CertificateForm
          onSubmit={handleCreate}
          isPending={isPending}
          submitLabel="Create"
        />
      </div>
    </section>
  );
};

export default AddCertificate;
