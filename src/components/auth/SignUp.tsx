// src/components/SignUp.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { supabaseBrowserClient } from "@/utils/supabase/client";
import {
  formClass,
  errorClass,
  buttonClass,
} from "@/utils/styles/commonClasses";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type SignUpData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpData>();
  const supabase = supabaseBrowserClient();

  const onSubmit = async (data: SignUpData) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;
      alert("Check your email for the confirmation link!");
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

      <Input
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (val: string) => {
            if (watch("password") != val) {
              return "Your passwords do not match";
            }
          },
        })}
        type="password"
        placeholder="Confirm Password"
      />
      {errors.confirmPassword && (
        <span className={errorClass}>{errors.confirmPassword.message}</span>
      )}

      <Button type="submit" className={buttonClass}>
        Sign Up
      </Button>
    </form>
  );
}
