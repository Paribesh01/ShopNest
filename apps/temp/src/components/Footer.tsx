import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-gray-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-gray-600 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link href="" className="hover:text-gray-600 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="" className="hover:text-gray-600 transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-gray-600 transition-colors"
                >
                  Privacy-policy
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-policy"
                  className="hover:text-gray-600 transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-and-cancellation"
                  className="hover:text-gray-600 transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-gray-600 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <p className="mb-4">
              Subscribe to our newsletter for exclusive deals and updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-100 text-gray-800 border-gray-300 focus:border-gray-500"
              />
              <Button type="submit" variant="secondary">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-300 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 sm:mb-0">
            <a
              href=""
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Facebook size={24} />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="#"
              rel="noopener noreferrer"
              target="_blank"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Instagram size={24} />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Twitter size={24} />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} House-of-aesthetics. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
