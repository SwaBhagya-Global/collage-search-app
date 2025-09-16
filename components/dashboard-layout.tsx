'use client'

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, GraduationCap, LogOut } from "lucide-react"
import { useState, useEffect } from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/admin/login"
  }

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Blog Manager", href: "/admin/blog-manager", icon: LayoutDashboard },
    { name: "Contact", href: "/admin/contact-manager", icon: LayoutDashboard },
  ]

  // Show loader on route change
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 300) // optional delay
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 mt-10 flex-1 flex flex-col">
            {/* Logo / title */}
            <div className="flex items-center space-x-2 mb-6">
              <GraduationCap className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-gray-800">Admin Panel</span>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 flex-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100 ${
                    pathname === item.href
                      ? "bg-gray-200 text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </a>
              ))}
            </nav>

            {/* Logout button */}
            <div className="mt-auto p-2 border-t border-gray-200">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-1xl">Logout</span>
              </Button>
            </div>
          </div>
        </aside>

        {/* Content area */}
        <main className="flex-1 p-4 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-50">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  )
}
