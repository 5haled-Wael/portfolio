import { useQuery } from "@tanstack/react-query";
import { getCertificates } from "../services/certificateService";

const useCertificates = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["certificates"],
    queryFn: getCertificates,
  });

  return {
    certificates: data ?? [],
    loading: isLoading,
    error,
    refetch,
  };
};

export default useCertificates;
