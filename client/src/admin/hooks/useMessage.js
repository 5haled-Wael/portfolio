import { useQuery } from "@tanstack/react-query";
import { getMessage } from "../../services/messageService";

const useMessage = (id) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => getMessage(id),
    enabled: Boolean(id),
  });

  return {
    message: data,
    loading: isLoading,
    error,
    refetch,
  };
};

export default useMessage;
