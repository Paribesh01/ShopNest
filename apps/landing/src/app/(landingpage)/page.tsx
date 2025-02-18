"use client";
import Link from "next/link"
import { ShoppingBag, ArrowRight, PieChart, Zap, Globe, Leaf, Calculator,Clock } from "lucide-react"
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
export default function Home() {

  const navItems=["Home", "About Us", "Contact", "Pricing"]

  const features=[
    {
      icon: Clock,
      title: "Instant Setup",
      description: "Get your business online in less than 24 hours.",
    },
    {
      icon: PieChart,
      title: "Real-Time Analytics",
      description: "Track your business performance live",
    },
    {
      icon: Calculator,
      title: "Financial Management",
      description: "Automated profit and expence tracking",
    },
  ]
  const footerItems = [
    {
      title: "Product",
      links: ["Overview", "Features", "Solutions", "Tutorials", "Pricing"],
    },
    {
      title: "Company",
      links: ["About us", "Careers", "Press", "News", "Contact"],
    },
    {
      title: "Resources",
      links: ["Blog", "Newsletter", "Events", "Help center", "Tutorials"],
    },
    {
      title: "Legal",
      links: ["Terms", "Privacy", "Cookies", "Licenses", "Contact"],
    },
  ]
  return (
    <>
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-50 w-full border-b border-custom-light bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ShopNest
            </span>
          </div>

          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                href="#"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden sm:block"
              href="#"
            >
              Sign in
            </Link>
            <Button className="px-4 py-1 rounded-xl bg-primary hover:bg-primary/90 text-white">Get Started Free</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-custom-soft via-white to-accent opacity-80"></div>
          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
          
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-custom-gradient1 to-custom-gradient2 bg-clip-text text-transparent">
              Ready-Made Websites for your Business Success
              </h1>
              <p className="mx-auto max-w-[700px] text-custom-dark md:text-xl">
              Get a professional website with built-in business management tools. Start selling immediately with zero technical knowledge required.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="px-4 py-1 rounded-xl bg-primary hover:bg-primary/90 text-white">
                  View Templates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className=" px-4 py-1 rounded-xl border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-custom-light">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-white px-3 py-1 text-sm text-primary font-medium">
                  Smart Business Tools
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-custom-dark">
                  Manage Your Business Smarter
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Built-in tools to help you track finances, analyze performance, and make better business decisions
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-4 p-6 bg-white rounded-xl shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-custom-soft">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-custom-dark">{feature.title}</h3>
                  <p className="text-center text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-custom-light px-3 py-1 text-sm text-primary font-medium">
                  Getting Started
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-custom-dark">
                  Launch Your Store Today
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of businesses who trust our sustainable platform. No technical skills
                  required, just a passion for finance and commerce.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-primary px-4 py-1 rounded-xl hover:bg-primary/90 text-white">
                    Start Free Trial
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary px-4 py-1 rounded-xl text-primary hover:bg-primary hover:text-white"
                  >
                    View Pricing
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
                  <img
                    alt="Dashboard preview"
                    className="object-cover"
                    src="https://sjc.microlink.io/X00Gr_Cqq7mFBSdHXsxl13N3Eh9ie-fwXg6stKo_mssLTMv_QLhEWzIrEIWBkugtitaPr8IGXQz8VZvqtvHBqQ.jpeg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>


<footer className="border-t border-custom-light bg-white">
        <div className="container py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ShopNest
                </span>
              </div>
              
              <div className="flex space-x-4">
                {["Twitter", "Facebook", "Instagram", "LinkedIn"].map((social) => (
                  <a key={social} href="#" className="text-muted-foreground hover:text-primary">
                    <span className="sr-only">{social}</span>
                    <Leaf className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
            {footerItems.map((column) => (
              <div key={column.title}>
                <h3 className="font-semibold text-custom-dark mb-3">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-custom-light flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ShopNest. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary mr-4">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
