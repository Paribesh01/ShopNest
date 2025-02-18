"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User, Search, Menu, ChevronDown } from "lucide-react";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import Image from "next/image";
import image from "@/images/logo.jpg";
import { useRecoilState } from "recoil";
import { cartItemState, cartState } from "@/recoil/atom";
import { useParams } from "next/navigation";

export default function Navbar({ category }: any) {
  const { storeName } = useParams();

  const [isCartOpen, setIsCartOpen] = useRecoilState(cartState);
  const [cartItems, setCartItems] = useRecoilState<any>(cartItemState);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const totalItems = cartItems.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );

  // Extract categories from products and update the categories state

  // useEffect(() => {
  //   if (searchTerm.length > 0) {
  //     setIsSearching(true);
  //     const results = products.filter((product: any) =>
  //       product.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     setSearchResults(results.slice(0, 5)); // Limit to 5 results
  //   } else {
  //     setIsSearching(false);
  //     setSearchResults([]);
  //   }
  // }, [searchTerm, products]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add additional search logic here if needed
  };

  return (
    <nav className="bg-white shadow-md z-40" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src={image}
                alt="logo"
                width={40}
                height={40}
                className="relative rounded-lg shadow-2xl animate-float"
              />
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link
                  href={`/${storeName}/`}
                  className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <div className="relative group">
                  <Link
                    href={`/${storeName}/products`}
                    className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium inline-flex items-center"
                  >
                    Products <ChevronDown className="ml-1 h-4 w-4" />
                  </Link>
                  <div className="absolute left-0 mt-2 w-48 z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {category.map((category: any) => (
                        <Link
                          key={category.id}
                          href={`/${storeName}/category/${category.name
                            .toLowerCase()
                            .replace(" & ", "-")}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <Link
                  href={`/${storeName}/about`}
                  className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </Link>
                <Link
                  href={`/${storeName}/contact`}
                  className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center">
              <form onSubmit={handleSearch} className="mr-4 relative">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-64 pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                </div>
                {isSearching && (
                  <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg z-10">
                    {searchResults.length > 0 ? (
                      searchResults.map((product: any) => (
                        <Link
                          key={product.id}
                          href={`/${storeName}/products/${product.id}`}
                          className="flex items-center px-4 py-2 hover:bg-gray-100"
                          onClick={() => setSearchTerm("")}
                        >
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded-md mr-3"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-700">
                        No results found
                      </div>
                    )}
                  </div>
                )}
              </form>
              <Button
                onClick={() => {
                  setIsCartOpen(true);
                }}
                variant="outline"
                size="icon"
                className="relativ bg-white"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/fdsaf"
              className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <div>
              <Link
                href={`/${storeName}/products`}
                className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <div className="pl-4">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/${storeName}/category/${category
                      .toLowerCase()
                      .replace(" & ", "-")}`}
                    className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href={`/${storeName}/about`}
              className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href={`/${storeName}/contact`}
              className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <Button
                onClick={() => {
                  setIsCartOpen(true);
                }}
                variant="outline"
                size="icon"
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
            <div className="mt-3 px-2">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                </div>
                {isSearching && (
                  <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg z-10">
                    {searchResults.length > 0 ? (
                      searchResults.map((product: any) => (
                        <Link
                          key={product.id}
                          href={`/${storeName}/products/${product.id}`}
                          className="flex items-center px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            setSearchTerm("");
                            setIsMenuOpen(false);
                          }}
                        >
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded-md mr-3"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-700">
                        No results found
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
