import { useAllBetaQuery } from "@/utils/hooks";
import { getAllBeta } from "@/utils/queries";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ListBeta from "./list-beta";

export default async function Beta() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["hydrate-beta"],
    queryFn: getAllBeta,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <h1>here is the beta</h1>
        <ListBeta />
      </HydrationBoundary>
    </main>
  );
}
