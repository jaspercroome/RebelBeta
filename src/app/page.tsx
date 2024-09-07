import { BountyButton } from "@/components/bounties/BountyButton";
import Auth from "../components/auth/Auth";
import { BetaButton } from "@/components/beta/BetaButton";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <div className="h-full w-2/3 flex flex-col space-y-4 items-center">
        <p>
          <b>
            <em>rebel</em>
          </b>
          : individuals working together, outside the established system.
        </p>
        <p>
          <b>
            <em>beta</em>
          </b>
          : intel, knowledge, information about conditions, experiences or tips.
        </p>
        <BountyButton />
        <BetaButton />
        <p>
          This site is your go-to for requesting, collecting & sharing beta.
        </p>
        <p className="text-2xl font-black italic">Sharing is Caring</p>
        <p>
          this site intentionally left janky -{" "}
          <a href="mailto:hey@jaspercroo.me">reach out if you want to help!</a>
        </p>
        <Auth />
      </div>
    </main>
  );
}
