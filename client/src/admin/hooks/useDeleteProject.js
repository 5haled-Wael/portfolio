import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../../services/projectService";

const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export default useDeleteProject;
