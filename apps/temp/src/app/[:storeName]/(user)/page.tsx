import Image from "next/image";
import HeroPage from "@/components/HeroPage";
import Navbar from "@/components/Navbar";
import FeaturedProducts from "@/components/FeatureProducts";
export default async function Home() {
  return (
    <div suppressHydrationWarning>
      <HeroPage />

      <FeaturedProducts />
    </div>
  );
}
