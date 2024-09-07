import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import {
  getAllBeta,
  getOneBeta,
  getSubscription,
  patchSubscription,
} from "./queries";
import { useSupabase } from "@/components/providers/SupabaseProvider";

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

export const useSubscription = (userId: string) => {
  return useQuery({
    queryKey: ["subscription", userId],
    queryFn: async () => await getSubscription(userId),
    enabled: !!userId,
  });
};

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      isPremium,
    }: {
      userId: string;
      isPremium: boolean;
    }) => {
      const response = await patchSubscription(userId, isPremium);

      if (response.error) {
        throw response.error;
      }
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["subscription", variables.userId],
      });
    },
  });
};

export const useIsAuthenticated = (): boolean => {
  const { user } = useSupabase();
  return !!user;
};

export const useProtectedRoute = () => {
  const { user } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  return user;
};

export const useProtectedAction = () => {
  const { user } = useSupabase();
  console.log({ user });
  const router = useRouter();

  return useCallback(
    (action: () => void) => {
      if (user) {
        action();
      } else {
        router.push("/auth");
      }
    },
    [user, router],
  );
};
