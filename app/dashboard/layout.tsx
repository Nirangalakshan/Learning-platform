import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardNavbar } from "@/components/dashboard/navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="lg:ml-64 min-h-screen transition-all duration-300">
        <DashboardNavbar />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
