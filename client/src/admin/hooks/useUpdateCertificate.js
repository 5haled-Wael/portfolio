import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCertificate } from "../../services/certificateService";

const useUpdateCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) => updateCertificate(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
  });
};

export default useUpdateCertificate;
