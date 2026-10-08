import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSkill } from "../../services/skillServices";

const useCreateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (skillData) => createSkill(skillData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};

export default useCreateSkill;
