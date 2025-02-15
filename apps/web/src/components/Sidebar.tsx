"use client"
import {
    BarChart3,
    Gift,
    Home,
    Image,
    LayoutGrid,
    MessageSquareWarning,
    Package,
    Palette,
    Plug2,
    Settings,
    ShoppingCart,
    Smartphone,
    Users,
    Wallet,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@repo/ui/avatar"
import {
    Sidebar,
    SidebarProvider,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@repo/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

const mainLinks = [
    { icon: Home, label: "Home", href: "/dashboard" },
    { icon: Users, label: "Store Users", href: "/dashboard/users" },
    { icon: LayoutGrid, label: "Categories", href: "/dashboard/categories" },
    { icon: Package, label: "Products", href: "/dashboard/products" },
    { icon: Users, label: "Customers", href: "/dashboard/customers" },
    { icon: ShoppingCart, label: "Orders", href: "/dashboard/orders" },
]

const customizations = [
    { icon: LayoutGrid, label: "Pages", href: "/dashboard/pages" },
    { icon: Palette, label: "Appearance", href: "/dashboard/appearance" },
    { icon: Settings, label: "Store Setting", href: "/dashboard/store_setting" },
    { icon: Wallet, label: "Payment Setting", href: "/dashboard/payment_setting" },
]

export function AppSidebar() {
    const pathName = usePathname();
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader className="border-b border-border p-4">
                    <Link href='/dashboard' className="flex items-center gap-3">
                        <Avatar className="bg-purple-100">
                            <AvatarFallback className="text-purple-500">B</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-medium">Babu</span>
                            <span className="text-xs text-muted-foreground">OWNER</span>
                        </div>
                    </Link>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Main Links</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {mainLinks.map((item) => {
                                    const isActive = pathName === item.href
                                    return (
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton asChild isActive={isActive}>
                                            <Link href={item.href} className={`${isActive ? "bg-purple-50 text-purple-500" : ""}`}>
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                        {item.badge && (
                                            <SidebarMenuBadge
                                                className={`${item.badge === "NEW" ? "bg-red-500 text-white" : "bg-purple-100 text-purple-500"}`}
                                            >
                                                {item.badge}
                                            </SidebarMenuBadge>
                                        )}
                                    </SidebarMenuItem>
                                )}
                                )}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup>
                        <SidebarGroupLabel>Customizations</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                            {customizations.map((item) => {
                                    const isActive = pathName === item.href
                                    return (
                                        <SidebarMenuItem key={item.label}>
                                            <SidebarMenuButton asChild isActive={isActive}>
                                                <Link href={item.href} className={`${isActive ? "bg-purple-50 text-purple-500" : ""}`}>
                                                    <item.icon className="h-4 w-4" />
                                                    <span>{item.label}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                            {item.badge && (
                                                <SidebarMenuBadge className="bg-purple-100 text-purple-500">{item.badge}</SidebarMenuBadge>
                                            )}
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    )
}

