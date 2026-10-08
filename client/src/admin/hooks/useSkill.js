import { useQuery } from "@tanstack/react-query";
import { getSkill } from "../../services/skillServices";

const useSkill = (id) => {
  return useQuery({
    queryKey: ["skill", id],
    queryFn: () => getSkill(id),
  });
};

export default useSkill;
