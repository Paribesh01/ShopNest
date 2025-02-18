// ProductsList.tsx
"use client";
import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardFooter } from "@repo/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRecoilState } from "recoil";
import { cartItemState, cartState } from "@/recoil/atom";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProductsList = ({ products, storeName }: any) => {
  const router = useRouter();

  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [isCartOpen, setIsCartOpen] = useRecoilState(cartState);
  const [cartItems, setCartItems] = useRecoilState<any>(cartItemState);

  const handleAddToCart = (product: any) => {
    const existingProduct = cartItems.find(
      (item: any) => item.id === product.id
    );
    if (existingProduct) {
      setCartItems(
        cartItems.map((item: any) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return a.name.localeCompare(b.name);
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const handelBuyNow = (product: any) => {
    const existingProduct = cartItems.find(
      (item: any) => item.id === product.id
    );
    if (existingProduct) {
      // If the product is already in the cart, just increase its quantity
      setCartItems(
        cartItems.map((item: any) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Otherwise, add the product to the cart
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    router.push("/checkout");
  };

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(sortedProducts.length / productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <Card key={product.id} className="flex flex-col justify-between">
            <CardContent className="p-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />

              <h2 className="text-lg font-semibold">
                <Link href={`/${storeName}/products/${product.id}`}>
                  {product.name}
                </Link>
              </h2>
              <p className="text-gray-600">Rs.{product.price}</p>
              <p className="text-sm text-gray-500 mt-2">{product.category}</p>
            </CardContent>
            <CardFooter className="p-4">
              <Button
                className="w-full mr-2"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
              <Button
                className="w-full ml-2"
                onClick={() => handelBuyNow(product)}
              >
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="mr-2"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        {pageNumbers.map((number) => (
          <Button
            key={number}
            onClick={() => setCurrentPage(number)}
            variant={currentPage === number ? "default" : "outline"}
            className="mx-1"
          >
            {number}
          </Button>
        ))}
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, pageNumbers.length))
          }
          disabled={currentPage === pageNumbers.length}
          className="ml-2"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
};

export default ProductsList;
