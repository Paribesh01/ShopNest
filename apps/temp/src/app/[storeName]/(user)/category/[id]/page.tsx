// ProductsPage.tsx
import { getProductsByStore } from "@/actions/products";
import ProductsList from "@/components/ProductsList";
import { notFound } from "next/navigation";

export default async function ProductsPage({ params }: any) {
  const { storeName } = params;
  console.log("this is the prams", params);
  const { products } = await getProductsByStore(storeName);
  console.log(products);
  if (products.length <= 0) {
    notFound();
  }
  function capitalizeFirstLetter(string: string) {
    if (!string) return string; // Return if the string is empty
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Our Products : {capitalizeFirstLetter(params.id)}
      </h1>

      <ProductsList products={products} />
    </div>
  );
}
