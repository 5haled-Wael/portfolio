import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMessage } from "../../services/messageService";

const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};

export default useDeleteMessage;
