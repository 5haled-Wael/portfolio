import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../services/profileService";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => updateProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export default useUpdateProfile;
