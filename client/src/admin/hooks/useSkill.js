import { useQuery } from "@tanstack/react-query";
import { getSkill } from "../../services/skillServices";

const useSkill = (id) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["skill", id],
    queryFn: () => getSkill(id),
  });

  return {
    skill: data,
    loading: isLoading,
    error,
    refetch,
  };
};

export default useSkill;
