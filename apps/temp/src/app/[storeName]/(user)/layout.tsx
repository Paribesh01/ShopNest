import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

import Navbar from "@/components/Navbar";
import Cart from "@/components/Cart";
import Footer from "@/components/Footer";
import { fetchCategories } from "@/actions/category";

export const metadata: Metadata = {
  title: "House of asthetics",
  description: "Store for your asthetics",
};

export default async function Layout({ children, params }: any) {
  const { storeName } = params;
  const { category } = await fetchCategories(storeName);
  console.log("category", category);

  return (
    <>
      <Navbar category={category} />
      <NextTopLoader />
      <Cart />
      {children}

      <Footer />
    </>
  );
}
