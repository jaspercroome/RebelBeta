import { AuthPageLayout } from "./AuthPageLayout";

export default async function Auth() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <p>authenticate yourself!</p>
      <AuthPageLayout />
    </main>
  );
}
