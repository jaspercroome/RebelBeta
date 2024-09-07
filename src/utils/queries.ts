import { supabaseBrowserClient } from "./supabase/client";

const supabase = supabaseBrowserClient();

export const getAllBeta = async () => {
  return (await supabase.from("beta_reports").select("*")).data;
};

export const getOneBeta = async (betaId: number) => {
  return (await supabase.from("beta_reports").select().eq("id", betaId)).data;
};

export const getAllBounties = async () => {
  return (await supabase.from("bounties").select("*")).data;
};

export const getBounty = async (bountyId: number) => {
  return (await supabase.from("bounties").select().eq("id", bountyId)).data;
};

export const getBountyByBeta = async (betaId: number) => {
  return (await supabase.from("bounty_claims").select().eq("id", betaId)).data;
};

export const getSubscription = async (userId: string) => {
  return (
    await supabase.from("users").select("is_premium").eq("id", userId).single()
  ).data;
};

export const patchSubscription = async (userId: string, isPremium: boolean) => {
  return await supabase
    .from("users")
    .update({ is_premium: isPremium })
    .eq("id", userId)
    .single();
};
