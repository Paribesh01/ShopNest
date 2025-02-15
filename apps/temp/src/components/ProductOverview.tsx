"use client";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";
import { useRecoilState } from "recoil";
import { cartItemState, cartState } from "@/recoil/atom";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductOverview({ product, products }: any) {
  const pro = product;
  const [isCartOpen, setIsCartOpen] = useRecoilState(cartState);
  const [cartItems, setCartItems] = useRecoilState<any>(cartItemState);
  const router = useRouter();

  // Handle add to cart button
  const handleAddToCart = (product: any) => {
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
      toast.success("Added to cart");
    } else {
      // Otherwise, add the product to the cart
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };
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

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <AspectRatio ratio={1 / 1} className="relative bg-muted">
            <img
              src={pro.imageUrl}
              alt={pro.name || "Product Image"}
              className="w-full h-full object-cover rounded-md"
            />
          </AspectRatio>
          <div className="flex flex-col justify-center p-6">
            <CardHeader>
              <CardTitle className="text-3xl">{pro.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{pro.description}</p>
              <Badge className="text-lg py-1 px-2 mb-4">Rs. {pro.price}</Badge>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full md:w-auto mr-2"
                onClick={() => handleAddToCart(pro)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button
                className="w-full md:w-auto ml-2"
                onClick={() => handelBuyNow(pro)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Buy Now
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>

      <Separator className="my-8" />

      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products
          .filter((product: any) => product.id !== pro.id) // Filter out the current product
          .slice(0, 4) // Limit to 4 products
          .map((product: any) => (
            <Card key={product.id}>
              <CardHeader className="p-0">
                <AspectRatio ratio={1 / 1}>
                  <img
                    src={product.imageUrl}
                    alt={product.name || `Related Product ${product.id}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </AspectRatio>
              </CardHeader>

              <CardContent className="p-4">
                <CardTitle className="text-lg">
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </CardTitle>
                {/* <p className="text-sm text-muted-foreground">
                  {product.description
                    ? product.description.split(" ").length > 15
                      ? product.description.split(" ").slice(0, 15).join(" ") +
                        "..."
                      : product.description
                    : "Brief product description"}
                </p> */}
              </CardContent>
              <CardFooter className="p-4">
                <Badge variant="secondary" className="w-full justify-center">
                  Rs. {product.price || 199.99}
                </Badge>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
