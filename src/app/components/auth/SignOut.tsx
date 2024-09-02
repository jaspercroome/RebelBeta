"use client";
// src/components/SignOut.tsx
import React from "react";
import { supabaseBrowserClient } from "@/utils/supabase/client";
import { buttonClass } from "@/utils/styles/commonClasses";

export default function SignOut() {
  const supabase = supabaseBrowserClient();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // Handle successful sign out (e.g., redirect to home page)
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(JSON.stringify(error));
      }
    }
  };

  return (
    <button onClick={handleSignOut} className={buttonClass}>
      Sign Out
    </button>
  );
}
