"use client";

import { useState, useEffect } from "react";
import { Button } from "@repo/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Import images
import image1 from "@/images/hero-image3.jpg";
import image2 from "@/images/hero-image2.jpg";
import image3 from "@/images/hero-image1.jpg";
import image4 from "@/images/hero-image4.jpg";

export default function HeroPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image1, image2, image3, image4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="bg-gradient-to-r from-purple-50 to-pink-50 min-h-[calc(100vh-64px)] flex items-center"
      suppressHydrationWarning
    >
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6 animate-fade-in-up">
            Discover Your Perfect Style
          </h1>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in-up animation-delay-200">
            Explore our curated collection of trendsetting fashion pieces that
            define your unique personality.
          </p>
          <Link href="/products">
            <Button
              className="animate-fade-in-up animation-delay-400 group"
              size="lg"
            >
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <div className="lg:w-1/2 relative w-full h-[500px] flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Featured Product ${index + 1}`}
              width={500} // Set fixed width
              height={500} // Set fixed height
              className={`absolute top-0 left-0 rounded-lg shadow-2xl transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{ objectFit: "contain" }} // Ensure image fits within the bounds without cropping
            />
          ))}
        </div>
      </div>
    </div>
  );
}
