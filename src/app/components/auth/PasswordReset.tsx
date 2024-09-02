// src/components/PasswordReset.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { supabaseBrowserClient } from "@/utils/supabase/client";
import {
  formClass,
  inputClass,
  errorClass,
  buttonClass,
} from "@/utils/styles/commonClasses";

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
      <input
        {...register("email", { required: "Email is required" })}
        type="email"
        placeholder="Email"
        className={inputClass}
      />
      {errors.email && (
        <span className={errorClass}>{errors.email.message}</span>
      )}

      <button type="submit" className={buttonClass}>
        Reset Password
      </button>
    </form>
  );
}
