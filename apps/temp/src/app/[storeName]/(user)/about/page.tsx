import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Badge } from "@repo/ui/badge";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        House Of Aesthetics
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Our Company</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              House of Aesthetics was founded in 2024 by Tenzin Gawa with a
              passion for delivering beautifully crafted, high-quality aesthetic
              products. Specializing in elegant earrings, bracelets, and
              timeless accessories, we are committed to offering a seamless
              shopping experience and exceptional customer service. Let our
              curated collection inspire your unique style and elevate your
              everyday look.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              At House of Aesthetics, our mission is to inspire beauty and
              confidence through carefully curated, high-quality accessories. We
              strive to create a shopping experience that celebrates
              individuality and style while maintaining a commitment to
              sustainability and ethical business practices. Our goal is to
              provide products that not only enhance your look but also reflect
              our values of quality, integrity, and environmental
              responsibility.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary">Quality</Badge>
              <Badge variant="secondary">Customer Satisfaction</Badge>
              <Badge variant="secondary">Innovation</Badge>
              <Badge variant="secondary">Sustainability</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Our Values</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Customer-Centric:</strong> We prioritize our customers in
              everything we do, ensuring a personalized and delightful shopping
              experience.
            </li>
            <li>
              <strong>Quality:</strong> Our commitment to excellence means we
              offer only the finest, high-quality products that meet our
              customers&#39; expectations.
            </li>
            <li>
              <strong>Integrity:</strong> We conduct our business with honesty,
              transparency, and respect, building trust with every interaction.
            </li>
            <li>
              <strong>Innovation:</strong> We continuously seek to innovate and
              improve our products and services to stay ahead in the world of
              fashion and aesthetics.
            </li>
            <li>
              <strong>Sustainability:</strong> We are dedicated to
              environmentally responsible practices, ensuring that our products
              and processes contribute to a more sustainable future.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
