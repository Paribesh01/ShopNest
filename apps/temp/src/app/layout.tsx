import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

import { Provider } from "./provider";

import { fetchCategories } from "@/actions/category";

export const metadata: Metadata = {
  title: "House of asthetics",
  description: "Store for your asthetics",
};

export default async function RootLayout({ children, params }: any) {
  return (
    <>
      <html lang="en">
        <body className="bg-white text-black">
          <Provider>
            <NextTopLoader />
            {children}
          </Provider>
        </body>
      </html>
    </>
  );
}
