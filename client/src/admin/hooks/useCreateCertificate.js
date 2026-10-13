import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCertificate } from "../../services/certificateService";

const useCreateCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
  });
};

export default useCreateCertificate;
