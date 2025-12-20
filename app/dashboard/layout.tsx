"use client";

import type React from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardNavbar } from "@/components/dashboard/navbar";
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context";
import { cn } from "@/lib/utils";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-muted/30 to-background">
      <DashboardSidebar />
      <div
        className={cn(
          "min-h-screen transition-all duration-300",
          collapsed ? "lg:ml-20" : "lg:ml-64"
        )}
      >
        <DashboardNavbar />
        <main className="min-h-screen">
          <div className="relative">
            {/* Subtle background pattern */}
            <div
              className={cn(
                "fixed inset-0 opacity-5 pointer-events-none transition-all duration-300",
                collapsed ? "lg:left-20" : "lg:left-64"
              )}
            >
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}
