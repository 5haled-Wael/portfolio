import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../../services/projectService";

const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export default useCreateProject;
