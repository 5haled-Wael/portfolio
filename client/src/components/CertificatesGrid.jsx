import useCertificates from "../hooks/useCertificates";
import CertificateCard from "./CertificateCard";

const CertificatesGrid = () => {
  const { certificates } = useCertificates();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {certificates.map((certificate) => (
        <CertificateCard certificate={certificate} key={certificate._id} />
      ))}
    </div>
  );
};

export default CertificatesGrid;
