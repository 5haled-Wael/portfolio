import { useQuery } from "@tanstack/react-query";
import { getProject } from "../../services/projectService";

const useProject = (id) => {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => getProject(id),
    enabled: !!id,
  });
};

export default useProject;
