import { BetaDetail } from "./beta-detail";

export default async function BetaDetailPage({
  params,
}: {
  params: { "beta-id": string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-4 p-4 lg:p-24">
      <BetaDetail id={params["beta-id"]} />
    </main>
  );
}
