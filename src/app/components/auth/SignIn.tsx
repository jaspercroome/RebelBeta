"use client";

// src/components/SignIn.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { supabaseBrowserClient } from "@/utils/supabase/client";
import {
  buttonClass,
  errorClass,
  formClass,
  inputClass,
} from "@/utils/styles/commonClasses";

type SignInData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>();
  const supabase = supabaseBrowserClient();

  const onSubmit = async (data: SignInData) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;
      // Handle successful sign in (e.g., redirect to dashboard)
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(JSON.stringify(error));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formClass}>
      <input
        {...register("email", { required: "Email is required" })}
        type="email"
        placeholder="Email"
        className={inputClass}
      />
      {errors.email && (
        <span className={errorClass}>{errors.email.message}</span>
      )}

      <input
        {...register("password", { required: "Password is required" })}
        type="password"
        placeholder="Password"
        className={inputClass}
      />
      {errors.password && (
        <span className={errorClass}>{errors.password.message}</span>
      )}

      <button type="submit" className={buttonClass}>
        Sign In
      </button>
    </form>
  );
}
