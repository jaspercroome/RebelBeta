"use client";
import { Auth } from "@/components/auth";
import { useSupabase } from "@/components/providers/SupabaseProvider";

export const AuthPageLayout = () => {
  const { user } = useSupabase();
  return <Auth isSignedIn={!!user} />;
};
