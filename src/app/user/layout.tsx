"use client";

import * as React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Server,
  Wallet,
  Users,
  Settings,
  Menu,
} from "lucide-react";

import { NavLink } from "@/components/Navlink";
import { useIsAdmin } from "@/hooks/useIsAdmin";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/user/dashboard", icon: LayoutDashboard },
  { title: "Machines", url: "/user/machines", icon: Server },
  { title: "Wallet", url: "/user/wallet", icon: Wallet },
  { title: "Referrals", url: "/user/referrals", icon: Users },
  { title: "Settings", url: "/user/settings", icon: Settings },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#0f172a] text-white">
        
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          
          {/* Mobile header with hamburger */}
          <div className="md:hidden p-3 border-b border-gray-700 flex items-center bg-[#0b0e13]">
            <SidebarTrigger className="p-2 rounded-md hover:bg-gray-800 transition-colors">
              <Menu className="h-6 w-6 text-white" />
            </SidebarTrigger>
            <span className="ml-3 text-white font-semibold">Menu</span>
          </div>

          {/* Page content */}
          <div className="flex-1 ">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const { isAdmin } = useIsAdmin();

  return (
    <Sidebar
      collapsible="offcanvas"
      className="bg-[#0f172a] text-white border-r border-gray-700 transition-all duration-300"
    >
      <SidebarContent>
        <SidebarGroup className="mt-7">
          <SidebarGroupLabel>
            <Image
              src="/ecomiex-logo.png"
              width={150}
              height={150}
              alt="Logo"
              className="mx-auto mb-4"
            />
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        href={item.url}
                        className={`flex items-center p-2 rounded-md transition-colors ${
                          isActive ? "bg-emerald-600 text-white" : "text-white hover:bg-gray-800"
                        }`}
                      >
                        <item.icon className="mr-2 h-5 w-5" />
                        {item.title}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}

              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
