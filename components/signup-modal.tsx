"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import BASE_URL from "@/app/config/api"

interface SignupModalProps {
  open: boolean
  onClose: () => void
  onOpenLogin?: () => void
}

export default function SignupModal({ open, onClose, onOpenLogin }: SignupModalProps) {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showOtpScreen, setShowOtpScreen] = useState(false)
  const [otp, setOtp] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  })

  useEffect(() => {
    if (!open) {
      setShowOtpScreen(false)
      setOtp("")
    }
  }, [open])

  const handleSignup = async  (e: React.FormEvent) => {
      e.preventDefault()

  setError("")
  setLoading(true)

  try {
    const response = await fetch(
      `${BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      setError(data.message || "Registration failed")
      return
    }

    // Registration successful
    setShowOtpScreen(true)

  } catch (error) {
    console.error("Signup error:", error)
    setError("Unable to connect to server. Please try again.")
  } finally {
    setLoading(false)
  }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
     e.preventDefault()

  setError("")
  setLoading(true)

  try {
    const response = await fetch(
      `${BASE_URL}/auth/verify-register-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: otp,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      setError(data.message || "Invalid OTP")
      return
    }

    // OTP verified successfully
    console.log("OTP verified:", data)

    onClose()
    setShowOtpScreen(false)
    setOtp("")
    setError("")

  } catch (error) {
    console.error("OTP verification error:", error)
    setError("Unable to connect to server. Please try again.")
  } finally {
    setLoading(false)
  }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose()
          setShowOtpScreen(false)
          setOtp("")
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-blue-600">
            {showOtpScreen ? "Verify Your Account" : "Registration Form"}
          </DialogTitle>
        </DialogHeader>

        {showOtpScreen ? (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-center text-sm text-gray-600">
              We sent a 6-digit code to {formData.email || "your email"}. Enter it below to continue.
            </p>

            <div className="space-y-2">
              <Label htmlFor="otp">OTP Code</Label>
              <Input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Verify Account
            </Button>

            <Button type="button" variant="ghost" className="w-full" onClick={() => setShowOtpScreen(false)}>
              Back
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Create Account
            </Button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Button
                type="button"
                variant="link"
                className="text-blue-600 p-0"
                onClick={() => {
                  onClose()
                  onOpenLogin?.()
                }}
              >
                Login
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
