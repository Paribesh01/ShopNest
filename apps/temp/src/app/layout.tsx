import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

import { Provider } from "./provider";
import Navbar from "@/components/Navbar";
import Cart from "@/components/Cart";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "House of asthetics",
  description: "Store for your asthetics",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const category: any = [
    {
      id: 1,
      name: "Women",
    },
    {
      id: 2,
      name: "Men",
    },
  ];

  return (
    <>
      <html lang="en">
        <body className="bg-white text-black">
          <Provider>
            <Navbar category={category} />
            <NextTopLoader />
            <Cart />
            {children}

            <Footer />
          </Provider>
        </body>
      </html>
    </>
  );
}
