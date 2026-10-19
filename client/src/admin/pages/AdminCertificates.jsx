import { useNavigate } from "react-router-dom";
import useCertificates from "../../hooks/useCertificates";
import AdminCertificateCard from "../components/AdminCertificateCard";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminButton from "../components/AdminButton";
import { PlusCircle } from "lucide-react";
import LoadingState from "../../components/states/LoadingState";
import ErrorState from "../../components/states/ErrorState";
import EmptyState from "../../components/states/EmptyState";

const AdminCertificates = () => {
  const navigate = useNavigate();
  const { certificates, loading, error, refetch } = useCertificates();

  return (
    <div>
      {/* Header & Back Button */}
      <AdminPageHeader title="Certificates">
        <AdminButton path="/admin/certificates/new" icon={PlusCircle}>
          Add New Certificate
        </AdminButton>
      </AdminPageHeader>

      {loading && <LoadingState />}

      {!loading && error && (
        <ErrorState message={error.message} onRetry={refetch} />
      )}

      {!loading && !error && certificates.length === 0 && (
        <EmptyState
          title="No Certificates Yet"
          message="Certificates are the backbone of your portfolio. Add some to get started."
          actionLabel="Add New Certificate"
          onAction={() => navigate("/admin/certificates/new")}
        />
      )}

      {!loading && !error && certificates.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate) => (
            <AdminCertificateCard
              key={certificate._id}
              certificate={certificate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCertificates;
