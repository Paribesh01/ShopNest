import ProductOverview from "@/components/ProductOverview";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: any) {
  const product = {
    id: 1,
    name: "Wireless Headphones",
    price: 299.99,
    quantity: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  };

  const products: any = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 299.99,
      quantity: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      name: "Smartphone",
      price: 699.99,
      quantity: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 3,
      name: "Laptop",
      price: 1299.99,
      quantity: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 4,
      name: "Wireless Headphones",
      price: 299.99,
      quantity: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    },
  ];

  console.log(product);
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
