import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import {
  getAllBeta,
  getOneBeta,
  getSubscription,
  patchSubscription,
  postBeta,
} from "./queries";
import { useSupabase } from "@/components/providers/SupabaseProvider";
import { Database } from "./supabase/types";

export const useAllBetaQuery = () => {
  const response = useQuery({
    queryFn: async () => await getAllBeta(),
    queryKey: ["betaQuery", "all"],
  });
  return { ...response, data: response.data?.data };
};
export const useBetaQuery = (betaId: string) => {
  const response = useQuery({
    queryFn: async () => await getOneBeta(betaId),
    queryKey: ["betaQuery", betaId],
    enabled: !!betaId,
  });
  return { ...response, data: response.data?.data };
};
export const usePostBetaMutation = () => {
  return useMutation({
    mutationFn: async (
      beta: Database["public"]["Tables"]["beta_reports"]["Insert"],
    ) => await postBeta(beta),
    onError: (e) => {
      throw e;
    },
    onSuccess: (d) => {
      return d;
    },
  });
};

export const useSubscription = (userId: string) => {
  return useQuery({
    queryKey: ["subscription", userId],
    queryFn: async () => await getSubscription(userId),
    enabled: !!userId,
    select: (response) => ({
      ...response,
      isPremium: response.data?.is_premium,
    }),
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
