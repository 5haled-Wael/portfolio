import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../../services/projectService";

const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) => updateProject(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export default useUpdateProject;
