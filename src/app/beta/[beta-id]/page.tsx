import { getServerSideProps } from "next/dist/build/templates/pages";
import { BetaDetail } from "./beta-detail";

export default async function BetaDetailPage({
  params,
}: {
  params: { "beta-id": string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-4 p-24">
      <p>Beta Detail</p>
      <BetaDetail id={params["beta-id"]} />
    </main>
  );
}
