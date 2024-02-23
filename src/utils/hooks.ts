import { useQuery } from "@tanstack/react-query";
import { getAllBeta, getOneBeta } from "./queries";

export const useAllBetaQuery = () => {
  const response = useQuery({
    queryFn: () => getAllBeta(),
    queryKey: ["betaQuery", "all"],
  });
  return response;
};
export const useBetaQuery = (betaId: number) => {
  const response = useQuery({
    queryFn: () => getOneBeta(betaId),
    queryKey: ["betaQuery", "all"],
  });
  return response;
};
