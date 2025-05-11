import type React from "react"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { getCurrentUser } from "@/lib/auth"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user || !user.isAdmin) {
    redirect("/login?callbackUrl=/admin")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] min-h-screen">
      <AdminSidebar />
      <div className="p-6">{children}</div>
    </div>
  )
}
