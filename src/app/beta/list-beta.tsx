"use client";
import { BetaTable } from "@/components/beta/BetaTable";
import { NewBetaCard } from "@/components/beta/NewBetaCard";
import { NewBountyCard } from "@/components/bounties/NewBountyCard";
import { useAllBetaQuery, useProtectedAction } from "@/utils/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ListBeta = () => {
  const router = useRouter();
  const protectedAction = useProtectedAction();
  const { data: beta } = useAllBetaQuery();
  const handleButtonClick = () => {
    protectedAction(() => {
      router.push("/bounties/new");
    });
  };

  return (
    <div className="h-full flex flex-col w-full gap-4 justify-center items-center">
      <BetaTable data={beta} />
      <div className="h-fit py-2 px-4 w-fit flex flex-row gap-4">
        <NewBountyCard />
        <NewBetaCard />
      </div>
    </div>
  );
};

export default ListBeta;
