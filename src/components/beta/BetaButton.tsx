"use client";
import { useProtectedAction } from "@/utils/hooks";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const BetaButton = () => {
  const router = useRouter();
  const protectedAction = useProtectedAction();

  const handleButtonClick = () => {
    protectedAction(() => {
      router.push("/beta/new");
    });
  };
  return (
    <Button
      className="border-black border-2 rounded-sm p-1 hover:bg-pink-400 hover:text-black"
      onClick={handleButtonClick}
    >
      Share your Beta
    </Button>
  );
};
