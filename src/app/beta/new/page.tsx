import { BetaForm } from "@/components/beta/BetaForm";

export default function Beta() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 max-h-full overflow-y-auto">
      <h1>Share your beta</h1>
      <BetaForm />
    </main>
  );
}
