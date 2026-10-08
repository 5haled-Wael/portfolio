import { useQuery } from "@tanstack/react-query";
import { getSkills } from "../services/skillServices";

const useSkills = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });

  return {
    skills: data ?? [],
    loading: isLoading,
    error,
    refetch,
  };
};

export default useSkills;
