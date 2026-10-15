import { useQuery } from "@tanstack/react-query";
import { getAllMessages } from "../../services/messageService";

const useMessages = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["messages"],
    queryFn: getAllMessages,
  });

  return {
    messages: data ?? [],
    isLoading,
    error,
  };
};

export default useMessages;
