// src/components/PasswordReset.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { supabaseBrowserClient } from "@/utils/supabase/client";
import { formClass, errorClass } from "@/utils/styles/commonClasses";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type PasswordResetData = {
  email: string;
};

export default function PasswordReset() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetData>();
  const supabase = supabaseBrowserClient();

  const onSubmit = async (data: PasswordResetData) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email);
      if (error) throw error;
      alert("Check your email for the password reset link!");
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

      <Button type="submit">Reset Password</Button>
    </form>
  );
}
