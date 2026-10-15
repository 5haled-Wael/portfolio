import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage } from "../services/messageService";

const useCreateMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};

export default useCreateMessage;
