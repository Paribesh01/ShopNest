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

// This is sample data - replace with your actual data
const mainLinks = [
    { icon: Home, label: "Home", href: "#" },
    { icon: Users, label: "Store Users", href: "#" },
    { icon: LayoutGrid, label: "Categories", href: "#" },
    { icon: Package, label: "Products", href: "#", isActive: true },
    { icon: Users, label: "Customers", href: "#" },
    { icon: ShoppingCart, label: "Orders", href: "#" },
    { icon: MessageSquareWarning, label: "Issues", href: "#" },
    { icon: Smartphone, label: "Blanxer SMS", href: "#", badge: "NEW" },
    { icon: Gift, label: "Discount Coupons", href: "#" },
    { icon: BarChart3, label: "Analytics", href: "#" },
    { icon: Image, label: "Media", href: "#" },
]

const customizations = [
    { icon: LayoutGrid, label: "Pages", href: "#" },
    { icon: Plug2, label: "Plugins", href: "#", badge: "+3 NEW" },
    { icon: Palette, label: "Appearance", href: "#" },
    { icon: Settings, label: "Store Setting", href: "#" },
    { icon: Wallet, label: "Payment Setting", href: "#" },
]

export function AppSidebar() {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader className="border-b border-border p-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="bg-purple-100">
                            <AvatarFallback className="text-purple-500">B</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-medium">Babu</span>
                            <span className="text-xs text-muted-foreground">OWNER</span>
                        </div>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Main Links</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {mainLinks.map((item) => (
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton asChild isActive={item.isActive}>
                                            <a href={item.href} className={`${item.isActive ? "bg-purple-50 text-purple-500" : ""}`}>
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.label}</span>
                                            </a>
                                        </SidebarMenuButton>
                                        {item.badge && (
                                            <SidebarMenuBadge
                                                className={`${item.badge === "NEW" ? "bg-red-500 text-white" : "bg-purple-100 text-purple-500"}`}
                                            >
                                                {item.badge}
                                            </SidebarMenuBadge>
                                        )}
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup>
                        <SidebarGroupLabel>Customizations</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {customizations.map((item) => (
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.href}>
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.label}</span>
                                            </a>
                                        </SidebarMenuButton>
                                        {item.badge && (
                                            <SidebarMenuBadge className="bg-purple-100 text-purple-500">{item.badge}</SidebarMenuBadge>
                                        )}
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    )
}

