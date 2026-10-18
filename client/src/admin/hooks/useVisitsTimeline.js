import { useQuery } from "@tanstack/react-query";
import { getVisitsTimeline } from "../../services/visitService";

const useVisitsTimeline = (days = 30) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["visits", "timeline", days],
    queryFn: () => getVisitsTimeline(days),
  });

  return {
    timeline: data ?? [],
    loading: isLoading,
    error,
    refetch,
  };
};

export default useVisitsTimeline;
