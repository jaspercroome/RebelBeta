import { useQuery } from "@tanstack/react-query";
import { getAllBeta, getOneBeta } from "./queries";

export const useAllBetaQuery = () => {
  const response = useQuery({
    queryFn: async () => await getAllBeta(),
    queryKey: ["betaQuery", "all"],
  });
  return response;
};
export const useBetaQuery = (betaId: number) => {
  const response = useQuery({
    queryFn: async () => await getOneBeta(betaId),
    queryKey: ["betaQuery", "all"],
    enabled: !!betaId,
  });
  return response;
};
