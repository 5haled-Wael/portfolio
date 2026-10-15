import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMessage } from "../../services/messageService";

const useUpdateMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateMessage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};

export default useUpdateMessage;
