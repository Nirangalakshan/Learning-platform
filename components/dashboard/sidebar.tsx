"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Brain,
  FileText,
  Sparkles,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/sidebar-context";
import { ModeToggle } from "@/components/mode-toggle";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    href: "/dashboard/subjects",
    label: "Subjects (Coming Soon)",
    icon: BookOpen,
    disabled: true,
  },
  { href: "/dashboard/quizzes", label: "Quizzes", icon: Brain },
  { href: "/dashboard/past-papers", label: "Past Papers", icon: FileText },
  // {
  //   href: "/dashboard/ai-generator",
  //   label: "AI Paper Generator",
  //   icon: Sparkles,
  // },
  {
    href: "/dashboard/assistant",
    label: "AI Assistant",
    icon: Sparkles,
  },
  { href: "/dashboard/progress", label: "Progress", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg glass"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full z-40 flex flex-col glass border-r border-border/50 transition-all duration-300",
          collapsed ? "w-20" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-between border-b border-border/50">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold">AI</span>
            </div>
            {!collapsed && (
              <span className="font-semibold text-foreground">
                Learn LK <span className="text-sm">🇱🇰</span>
              </span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronLeft
              className={cn(
                "w-5 h-5 transition-transform",
                collapsed && "rotate-180"
              )}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            // @ts-ignore
            if (item.disabled) {
              return (
                <div
                  title="Coming Soon"
                  key={`${item.href}-disabled`}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-muted-foreground/50 cursor-not-allowed"
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                  isActive
                    ? "bg-primary/10 text-[#009966] dark:text-[#00FF99]"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                onClick={() => setMobileOpen(false)}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border/50 space-y-2">
          <div
            className={cn(
              "flex items-center",
              collapsed ? "justify-center" : "justify-between px-2"
            )}
          >
            {!collapsed && (
              <span className="text-sm font-medium text-muted-foreground">
                Theme
              </span>
            )}
            <ModeToggle />
          </div>
          <Link href="/">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 text-muted-foreground hover:text-foreground",
                collapsed && "justify-center px-0"
              )}
            >
              <LogOut className="w-5 h-5" />
              {!collapsed && <span>Logout</span>}
            </Button>
          </Link>
        </div>
      </aside>
    </>
  );
}
