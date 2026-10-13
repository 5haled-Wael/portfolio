import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCertificate } from "../../services/certificateService";

const useDeleteCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
  });
};

export default useDeleteCertificate;
