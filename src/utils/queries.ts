import { supabase } from "./supabase/client";

export const getAllBeta = async () => {
  return (await supabase.from("beta").select("*")).data;
};

export const getOneBeta = async (betaId: number) => {
  return (await supabase.from("beta").select().eq("id", betaId)).data;
};

export const getAllBounties = async () => {
  return (await supabase.from("request").select("*")).data;
};

export const getBounty = async (bountyId: number) => {
  return (await supabase.from("request").select().eq("id", bountyId)).data;
};

export const getBountyByBeta = async (betaId: number) => {
  return (await supabase.from("request").select().eq("id", betaId)).data;
};
