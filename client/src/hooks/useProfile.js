import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/profileService";

const useProfile = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });

  return {
    profile: data,
    loading: isLoading,
    error,
    refetch,
  };
};

export default useProfile;
