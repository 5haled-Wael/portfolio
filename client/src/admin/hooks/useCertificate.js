import { useQuery } from "@tanstack/react-query";
import { getCertificate } from "../../services/certificateService";

const useCertificate = (id) => {
  return useQuery({
    queryKey: ["certificates", id],
    queryFn: () => getCertificate(id),
  });
};

export default useCertificate;
