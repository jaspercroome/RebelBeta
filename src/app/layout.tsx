import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/utils/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rebel Beta",
  description: "Ride Beta, for Rebels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <div className="h-fit w-full fixed top-0 flex flex-row justify-between">
            <a href="/">
              <h1 className="text-4xl font-black m-2">Rebel Beta</h1>
            </a>
            <div className="w-fit h-8 flex fixed top-0 right-0 justify-end flex-row space-x-4 mr-8 my-2">
              <a href="/bounties">
                <p className="underline font-bold">Bounties</p>
              </a>
              <a href="/beta">
                <p className="underline font-bold">Beta</p>
              </a>
            </div>
          </div>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
