"use client";
// src/components/Auth.tsx
import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import PasswordReset from "./PasswordReset";
import SignOut from "./SignOut";
import { linkClass } from "@/utils/styles/commonClasses";
import { useSupabase } from "../providers/SupabaseProvider";
import { Button } from "../ui/button";

type AuthMode = "signin" | "signup" | "reset";

export default function Auth({ isSignedIn = false }) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const { user } = useSupabase();

  if (isSignedIn || Boolean(user)) {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <p className="text-xl">👋, {user?.email}!</p>
        <SignOut />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {mode === "signin" && (
        <>
          <SignIn />
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Button onClick={() => setMode("signup")}>Sign Up</Button>
          </p>
          <p className="mt-2 text-center">
            Forgot your password?{" "}
            <Button onClick={() => setMode("reset")}>Reset Password</Button>
          </p>
        </>
      )}
      {mode === "signup" && (
        <>
          <SignUp />
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Button onClick={() => setMode("signin")}>Sign In</Button>
          </p>
        </>
      )}
      {mode === "reset" && (
        <>
          <PasswordReset />
          <p className="mt-4 text-center">
            Remember your password?{" "}
            <Button onClick={() => setMode("signin")} className={linkClass}>
              Sign In
            </Button>
          </p>
        </>
      )}
    </div>
  );
}
