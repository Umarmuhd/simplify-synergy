import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Header } from "../header/dashboard-header";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-muted flex flex-col py-5 px-6">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}
