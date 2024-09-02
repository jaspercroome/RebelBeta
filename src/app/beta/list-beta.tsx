"use client";
import { useAllBetaQuery } from "@/utils/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ListBeta = () => {
  const router = useRouter();
  const { data: beta } = useAllBetaQuery();
  return (
    <div className="h-full flex flex-col w-full gap-4 justify-center items-center">
      <div className="flex flex-col gap-4 p-2 align-middle justify-center h-fit w-fit">
        <p>Not seeing what you need?</p>
        <button
          className="border-black border-2 rounded-sm p-1 hover:bg-white hover:text-black"
          onClick={() => router.push("/bounties/new")}
        >
          Create a New Bounty
        </button>
        <p>and be the change!</p>
      </div>
    </div>
  );
};

export default ListBeta;
