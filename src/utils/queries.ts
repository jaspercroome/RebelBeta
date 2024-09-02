import { useSupabase } from "@/app/components/providers/AuthProvider";
import { supabaseBrowserClient } from "./supabase/client";

export const getAllBeta = async () => {
  const { supabase } = useSupabase();
  return (await supabase.from("beta_reports").select("*")).data;
};

export const getOneBeta = async (betaId: number) => {
  const { supabase } = useSupabase();
  return (await supabase.from("beta_reports").select().eq("id", betaId)).data;
};

export const getAllBounties = async () => {
  const { supabase } = useSupabase();
  return (await supabase.from("bounties").select("*")).data;
};

export const getBounty = async (bountyId: number) => {
  const { supabase } = useSupabase();
  return (await supabase.from("bounties").select().eq("id", bountyId)).data;
};

export const getBountyByBeta = async (betaId: number) => {
  const { supabase } = useSupabase();
  return (await supabase.from("bounty_claims").select().eq("id", betaId)).data;
};
