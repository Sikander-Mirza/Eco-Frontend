import { ReactNode } from "react";
import { DashboardSidebar } from "../app/user/layout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const handleLogout = () => {
    // Logout logic here
    console.log("User logged out!");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar onLogout={handleLogout} />
        
        <main className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-6 sticky top-0 z-10">
            <SidebarTrigger className="mr-4" />
          </header>

          <div className="flex-1 p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}

