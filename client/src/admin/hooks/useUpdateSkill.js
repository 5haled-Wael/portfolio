import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSkill } from "../../services/skillServices";

const useUpdateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) => updateSkill(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};

export default useUpdateSkill;
