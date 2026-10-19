import { useQuery } from "@tanstack/react-query";
import { getCertificate } from "../../services/certificateService";

const useCertificate = (id) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["certificates", id],
    queryFn: () => getCertificate(id),
  });

  return {
    certificate: data,
    loading: isLoading,
    error,
    refetch,
  };
};

export default useCertificate;
