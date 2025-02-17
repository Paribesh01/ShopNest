"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@repo/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/sheet";
import { Separator } from "@repo/ui/separator";
import { useRecoilState } from "recoil";
import { cartItemState, cartState } from "@/recoil/atom";
import Link from "next/link";

export default function Cart({ storeName }: any) {
  const [isCartOpen, setIsCartOpen] = useRecoilState(cartState);
  const [cartItems, setCartItems] = useRecoilState<any>(cartItemState);

  const totalItems = cartItems.reduce(
    (sum: any, item: any) => sum + item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (sum: any, item: any) => sum + item.price * item.quantity,
    0
  );

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items: any) =>
      items
        .map((item: any) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item: any) => item.quantity > 0)
    );
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg bg-white text-black">
        <SheetHeader>
          <SheetTitle className="bg-white text-black">Your Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4 bg-white text-black">
          {cartItems.map((item: any) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 bg-white text-black"
            >
              <div className="relative w-20 h-20 rounded-md overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="object-cover"
                />
              </div>
              <div className="flex-1 bg-white text-black">
                <Link href={`/products/${item.id}`}>
                  <h3 className="font-semibold">{item.name}</h3>
                </Link>
                <p className="text-sm text-gray-500">Rs.{item.price}</p>
                <div className="flex items-center mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, 1)}
                    className="bg-white"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-4 text-red-500"
                    onClick={() => updateQuantity(item.id, -item.quantity)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="font-semibold">Rs.{item.price * item.quantity}</p>
            </div>
          ))}
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between items-center font-semibold text-lg">
          <span>Total:</span>
          <span>Rs.{totalPrice}</span>
        </div>
        <Link href={`checkout`}>
          <Button
            className="w-full mt-8"
            onClick={() => {
              setIsCartOpen(false);
            }}
          >
            Proceed to Checkout
          </Button>
        </Link>
      </SheetContent>
    </Sheet>
    // </div>
  );
}
