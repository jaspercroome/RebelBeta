import { Session } from "@supabase/supabase-js";
import Link from "next/link";

export const Header = (props: { session: Session | null }) => {
  const { session } = props;

  return (
    <div className="h-fit w-full fixed top-0 flex flex-row justify-between">
      <Link href="/">
        <h1 className="text-4xl font-black m-2">Rebel Beta</h1>
      </Link>
      <div className="w-fit h-8 flex fixed top-0 right-0 justify-end flex-row space-x-4 mr-8 my-2">
        <Link href="/bounties">
          <p className="underline font-bold">Bounties</p>
        </Link>
        <Link href="/beta">
          <p className="underline font-bold">Beta</p>
        </Link>
        {session ? (
          <p className="font-extrabold text-green-600">{session.user.email}</p>
        ) : (
          <Link href="/signup">
            <p className="underline font-bold text-orange-600">Sign Up</p>
          </Link>
        )}
      </div>
    </div>
  );
};