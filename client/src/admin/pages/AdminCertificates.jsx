import { useNavigate } from "react-router-dom";
import useCertificates from "../../hooks/useCertificates";
import AdminCertificateCard from "../components/AdminCertificateCard";

const AdminCertificates = () => {
  const navigate = useNavigate();
  const { certificates, isLoading } = useCertificates();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="border-border flex items-center justify-between border-b pb-4">
        <h1 className="text-accent border-border text-3xl font-bold">
          Certificates
        </h1>

        <button
          onClick={() => navigate("/admin/certificates/new")}
          className="bg-accent text-primary hover:bg-accent/80 rounded-lg px-4 py-2 font-semibold transition-colors"
        >
          + Add New Certificate
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate) => (
          <AdminCertificateCard
            key={certificate._id}
            certificate={certificate}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminCertificates;
