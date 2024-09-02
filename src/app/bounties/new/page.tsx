import Image from "next/image";
import { NewBountyForm } from "./new-bounty";

export default function NewBounty() {
  return (
    <main className="flex min-h-screen flex-col items-center flex-start gap-4 p-24">
      <h1>New Bounty</h1>
      <NewBountyForm />
    </main>
  );
}
