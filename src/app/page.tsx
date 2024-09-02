import { createServerSupabaseClient } from "@/utils/supabase/server";
import Auth from "./components/auth/Auth";

export default async function Home() {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="h-full w-2/3 flex flex-col space-y-4 items-center">
        <p>
          <b>
            <em>beta</em>
          </b>
          : intel, knowledge, information about conditions, experiences or tips.
        </p>
        <p>
          This site is your go-to for requesting, collecting & sharing beta.
        </p>
        <p className="text-2xl font-black italic">Sharing is Caring</p>
        <p>
          this site intentionally left janky -{" "}
          <a href="mailto:hey@jaspercroo.me">reach out if you want to help!</a>
        </p>
        <Auth isSignedIn={!!session} />
      </div>
    </main>
  );
}
