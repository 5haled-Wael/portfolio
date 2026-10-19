import { useQuery } from "@tanstack/react-query";
import { getProject } from "../../services/projectService";

const useProject = (id) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["projects", id],
    queryFn: () => getProject(id),
    enabled: !!id,
  });

  return {
    project: data,
    loading: isLoading,
    error,
    refetch,
  };
};

export default useProject;
