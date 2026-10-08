import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSkill } from "../../services/skillServices";

const useDeleteSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteSkill(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};

export default useDeleteSkill;
