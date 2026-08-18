"use client"

import type React from "react"
import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Eye, EyeOff } from "lucide-react"
import BASE_URL from "@/app/config/api"

interface LoginModalProps {
  open: boolean
  onClose: () => void
  onOpenSignup?: () => void
}

export default function LoginModal({
  open,
  onClose,
  onOpenSignup,
}: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    setError("")
    setLoading(true)

    try {
      const response = await fetch(
        `${BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      )

      // Safely parse response
      let data: any = {}

      try {
        data = await response.json()
      } catch {
        data = {}
      }

      // Handle API errors
      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.")
        return
      }

      // Make sure token exists
      if (!data.token) {
        setError("Login successful, but token was not received.")
        return
      }

      // Save authentication information
      localStorage.setItem("token", data.token)

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        )
      }

      // Notify other components that user logged in
      window.dispatchEvent(new Event("userLogin"))

      // Clear form
      setEmail("")
      setPassword("")
      setError("")

      // Close modal
      onClose()

    } catch (err) {
      console.error("Login error:", err)

      setError(
        "Unable to connect to the server. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen && !loading) {
        setError("")
        onClose()
      }
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-blue-600">
                      {"Login Form"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          {/* Error Message */}
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              autoComplete="email"
              onChange={(e) => {
                setEmail(e.target.value)
                setError("")
              }}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">
              Password
            </Label>

            <div className="relative">
              <Input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
                required
                className="pr-10"
              />

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </Button>

          {/* Forgot Password */}
          <div className="text-center">
            <Button
              type="button"
              variant="link"
              className="text-blue-600"
              onClick={() => {
                // TODO: Open forgot password modal
                console.log(
                  "Forgot password clicked"
                )
              }}
            >
              Forgot Password?
            </Button>
          </div>

          {/* Signup */}
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}

            <Button
              type="button"
              variant="link"
              className="text-blue-600 p-0"
              onClick={() => {
                onClose()
                onOpenSignup?.()
              }}
            >
              Sign up
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
