import HeroPage from "@/components/HeroPage";
import FeaturedProducts from "@/components/FeatureProducts";
import { getProductsByStore } from "@/actions/products";
export default async function Home({ params }: any) {
  const { storeName } = params;
  console.log("this is the prams", params);
  const { products } = await getProductsByStore(storeName);
  console.log(products);

  return (
    <div suppressHydrationWarning>
      <HeroPage />

      <FeaturedProducts products={products} />
    </div>
  );
}
