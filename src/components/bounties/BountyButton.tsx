"use client";
import { useProtectedAction } from "@/utils/hooks";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const BountyButton = () => {
  const router = useRouter();
  const protectedAction = useProtectedAction();

  const handleButtonClick = () => {
    protectedAction(() => {
      router.push("/bounties/new");
    });
  };
  return (
    <Button
      className="border-black border-2 rounded-sm p-1 hover:bg-teal-200 hover:text-black"
      onClick={handleButtonClick}
    >
      Create a Bounty
    </Button>
  );
};
