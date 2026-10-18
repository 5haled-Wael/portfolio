import { useQuery } from "@tanstack/react-query";
import { getVisits } from "../../services/visitService";

const useVisits = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["visits"],
    queryFn: getVisits,
  });

  return {
    visits: data,
    isLoading,
    error,
    refetch,
  };
};

export default useVisits;
