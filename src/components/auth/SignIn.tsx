"use client";

// src/components/SignIn.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { supabaseBrowserClient } from "@/utils/supabase/client";
import {
  buttonClass,
  errorClass,
  formClass,
} from "@/utils/styles/commonClasses";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
      <Input
        {...register("email", { required: "Email is required" })}
        type="email"
        placeholder="Email"
      />
      {errors.email && (
        <span className={errorClass}>{errors.email.message}</span>
      )}

      <Input
        {...register("password", { required: "Password is required" })}
        type="password"
        placeholder="Password"
      />
      {errors.password && (
        <span className={errorClass}>{errors.password.message}</span>
      )}

      <Button type="submit">Sign In</Button>
    </form>
  );
}
