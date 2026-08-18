"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    let storedUser: { role?: string } | null = null

    try {
      storedUser = JSON.parse(localStorage.getItem("user") || "null")
    } catch {
      storedUser = null
    }

    if (token && storedUser?.role === "admin") {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
      router.replace("/admin/login")
    }
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
