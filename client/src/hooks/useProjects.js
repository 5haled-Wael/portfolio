import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../services/projectService";

const useProjects = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  return {
    projects: data ?? [],
    loading: isLoading,
    error,
    refetch,
  };
};

export default useProjects;
