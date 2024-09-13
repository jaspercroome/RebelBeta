import { supabaseBrowserClient } from "./supabase/client";
import { Database } from "./supabase/types";

const supabase = supabaseBrowserClient();

export const getAllBeta = async () => {
  return await supabase.from("beta_reports").select("*");
};

export const getOneBeta = async (betaId: number) => {
  return await supabase.from("beta_reports").select().eq("id", betaId);
};

export const postBeta = async (
  beta: Database["public"]["Tables"]["beta_reports"]["Insert"],
) => {
  return await supabase.from("beta_reports").insert(beta);
};

export const getAllBounties = async () => {
  return await supabase.from("bounties").select("*");
};

export const getBounty = async (bountyId: number) => {
  return await supabase.from("bounties").select().eq("id", bountyId);
};

export const getBountyByBeta = async (betaId: number) => {
  return await supabase.from("bounty_claims").select().eq("id", betaId);
};

export const getSubscription = async (userId: string) => {
  return await supabase
    .from("users")
    .select("is_premium")
    .eq("id", userId)
    .single();
};

export const patchSubscription = async (userId: string, isPremium: boolean) => {
  return await supabase
    .from("users")
    .update({ is_premium: isPremium })
    .eq("id", userId)
    .single();
};
