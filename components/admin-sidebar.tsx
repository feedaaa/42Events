"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, LayoutDashboard, Settings, Users, FileText, Upload, Download, Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AdminSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      label: "Events",
      icon: Calendar,
      href: "/admin/events",
      active: pathname === "/admin/events" || pathname.startsWith("/admin/events/"),
    },
    {
      label: "Categories",
      icon: Tag,
      href: "/admin/categories",
      active: pathname === "/admin/categories",
    },
    {
      label: "Users",
      icon: Users,
      href: "/admin/users",
      active: pathname === "/admin/users",
    },
    {
      label: "Import",
      icon: Upload,
      href: "/admin/import",
      active: pathname === "/admin/import",
    },
    {
      label: "Export",
      icon: Download,
      href: "/admin/export",
      active: pathname === "/admin/export",
    },
    {
      label: "Reports",
      icon: FileText,
      href: "/admin/reports",
      active: pathname === "/admin/reports",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
      active: pathname === "/admin/settings",
    },
  ]

  return (
    <div className="flex h-full min-h-screen flex-col border-r border-primary/20 bg-background">
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold text-primary">
          <Calendar className="h-6 w-6" />
          <span className="code-text">&lt;</span>Admin Panel<span className="code-text">/&gt;</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={route.active ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                route.active ? "bg-secondary text-white" : "hover:bg-muted hover:text-primary",
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-5 w-5" />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="mt-auto p-4 border-t border-primary/20">
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary block py-2">
          ← Back to Website
        </Link>
      </div>
    </div>
  )
}
