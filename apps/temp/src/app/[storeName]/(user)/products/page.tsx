import { getProductsByStore } from "@/actions/products";
import ProductsList from "@/components/ProductsList";

export default async function ProductsPage({ params }: any) {
  const { storeName } = params;
  console.log("this is the prams", params);
  const { products } = await getProductsByStore(storeName);
  console.log(products);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <ProductsList storeName={storeName} products={products} />
    </div>
  );
}
