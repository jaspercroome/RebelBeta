"use client";
// src/components/Auth.tsx
import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import PasswordReset from "./PasswordReset";
import SignOut from "./SignOut";
import { linkClass } from "@/utils/styles/commonClasses";

type AuthMode = "signin" | "signup" | "reset";

export default function Auth({ isSignedIn = false }) {
  const [mode, setMode] = useState<AuthMode>("signin");

  if (isSignedIn) {
    return <SignOut />;
  }

  return (
    <div className="max-w-md mx-auto">
      {mode === "signin" && (
        <>
          <SignIn />
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <button onClick={() => setMode("signup")} className={linkClass}>
              Sign Up
            </button>
          </p>
          <p className="mt-2 text-center">
            Forgot your password?{" "}
            <button onClick={() => setMode("reset")} className={linkClass}>
              Reset Password
            </button>
          </p>
        </>
      )}
      {mode === "signup" && (
        <>
          <SignUp />
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <button onClick={() => setMode("signin")} className={linkClass}>
              Sign In
            </button>
          </p>
        </>
      )}
      {mode === "reset" && (
        <>
          <PasswordReset />
          <p className="mt-4 text-center">
            Remember your password?{" "}
            <button onClick={() => setMode("signin")} className={linkClass}>
              Sign In
            </button>
          </p>
        </>
      )}
    </div>
  );
}
