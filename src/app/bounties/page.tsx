import { NewBountyCard } from "@/components/bounties/NewBountyCard";

export default function Bounties() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <h1>Bounties</h1>
      <NewBountyCard />
    </main>
  );
}
