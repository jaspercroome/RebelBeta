import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

import ReactQueryProvider from "@/utils/ReactQueryProvider";
import { SupabaseProvider } from "../components/providers/SupabaseProvider";
import { Header } from "@/components/Header";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rebel Beta",
  description: "Ride Beta, for Rebels",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header session={session} />
              {children}
            </ThemeProvider>
          </ReactQueryProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
