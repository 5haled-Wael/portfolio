import { useQuery } from "@tanstack/react-query";
import { getAllMessages } from "../../services/messageService";

const useMessages = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: getAllMessages,
  });

  return {
    messages: data ?? [],
    loading: isLoading,
    error,
    refetch,
  };
};

export default useMessages;
