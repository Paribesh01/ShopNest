import { getProductById, getProductsByStore } from "@/actions/products";
import ProductOverview from "@/components/ProductOverview";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: any) {
  const { product } = await getProductById(params.id);
  console.log("from the id ", product);

  const { storeName } = params;
  console.log("this is the prams", params);
  const { products } = await getProductsByStore(storeName);
  console.log(products);
  if (!product) {
    // console.log("error");
    notFound();
  }

  return (
    <>
      <ProductOverview product={product} products={products} />
    </>
  );
}
