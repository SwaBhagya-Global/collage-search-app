"use client"

import type React from "react"
import { useState, useEffect } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Eye, EyeOff, KeyRound, Lock, Mail, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react"
import BASE_URL from "@/app/config/api"

export type AuthModalMode = "login" | "forgot-password" | "change-password"

interface LoginModalProps {
  open: boolean
  onClose: () => void
  onOpenSignup?: () => void
  initialMode?: AuthModalMode
}

export default function LoginModal({
  open,
  onClose,
  onOpenSignup,
  initialMode = "login",
}: LoginModalProps) {
  const [mode, setMode] = useState<AuthModalMode>(initialMode)

  // Login form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState("")
  const [forgotOtp, setForgotOtp] = useState("")
  const [forgotNewPassword, setForgotNewPassword] = useState("")
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState("")
  const [forgotStep, setForgotStep] = useState<1 | 2>(1)
  const [showForgotNewPassword, setShowForgotNewPassword] = useState(false)
  const [showForgotConfirmPassword, setShowForgotConfirmPassword] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  // Change password state
  const [changeEmail, setChangeEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [changeNewPassword, setChangeNewPassword] = useState("")
  const [changeConfirmPassword, setChangeConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showChangeNewPassword, setShowChangeNewPassword] = useState(false)
  const [showChangeConfirmPassword, setShowChangeConfirmPassword] = useState(false)

  // Feedback states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  // Reset/sync modal state on open or initialMode change
  useEffect(() => {
    if (open) {
      setMode(initialMode)
      setError("")
      setSuccessMessage("")

      // Try pre-filling email from stored user session
      try {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          const parsed = JSON.parse(storedUser)
          if (parsed?.email) {
            setChangeEmail(parsed.email)
            if (!email) setEmail(parsed.email)
            if (!forgotEmail) setForgotEmail(parsed.email)
          }
        }
      } catch {
        // Ignore JSON parse errors
      }
    } else {
      setError("")
      setSuccessMessage("")
      setForgotStep(1)
      setForgotOtp("")
      setForgotNewPassword("")
      setForgotConfirmPassword("")
      setCurrentPassword("")
      setChangeNewPassword("")
      setChangeConfirmPassword("")
    }
  }, [open, initialMode])

  // Countdown timer for OTP resend cooldown
  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [resendCooldown])

  // ==================== LOGIN HANDLER ====================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")
    setLoading(true)

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      })

      let data: any = {}
      try {
        data = await response.json()
      } catch {
        data = {}
      }

      if (!response.ok) {
        setError(data.message || "Login failed. Please check your credentials.")
        return
      }

      if (!data.token) {
        setError("Login successful, but session token was not received.")
        return
      }

      localStorage.setItem("token", data.token)
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user))
      }

      window.dispatchEvent(new Event("userLogin"))

      setEmail("")
      setPassword("")
      setError("")
      onClose()
    } catch (err) {
      console.error("Login error:", err)
      setError("Unable to connect to the server. Please check your internet connection.")
    } finally {
      setLoading(false)
    }
  }

  // ==================== FORGOT PASSWORD: SEND OTP ====================
  const handleSendForgotOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")

    if (!forgotEmail.trim()) {
      setError("Please enter your registered email address.")
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forgotEmail.trim(),
        }),
      })

      let data: any = {}
      try {
        data = await response.json()
      } catch {
        data = {}
      }

      if (!response.ok) {
        setError(data.message || "Failed to send password reset OTP.")
        return
      }

      setSuccessMessage(data.message || "A 6-digit OTP has been sent to your email.")
      setForgotStep(2)
      setResendCooldown(30)
    } catch (err) {
      console.error("Forgot password OTP error:", err)
      setError("Unable to connect to server. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // ==================== FORGOT PASSWORD: RESEND OTP ====================
  const handleResendForgotOtp = async () => {
    if (resendCooldown > 0 || loading) return
    setError("")
    setSuccessMessage("")
    setLoading(true)

    try {
      const response = await fetch(`${BASE_URL}/auth/resend-forgot-password-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forgotEmail.trim(),
        }),
      })

      let data: any = {}
      try {
        data = await response.json()
      } catch {
        data = {}
      }

      if (!response.ok) {
        setError(data.message || "Failed to resend OTP.")
        return
      }

      setSuccessMessage("A new OTP has been sent to your email.")
      setResendCooldown(30)
    } catch (err) {
      console.error("Resend OTP error:", err)
      setError("Unable to resend OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // ==================== FORGOT PASSWORD: RESET PASSWORD ====================
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")

    if (!forgotOtp.trim()) {
      setError("Please enter the 6-digit verification OTP.")
      return
    }

    if (forgotNewPassword.length < 6) {
      setError("New password must be at least 6 characters long.")
      return
    }

    if (forgotNewPassword !== forgotConfirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forgotEmail.trim(),
          otp: forgotOtp.trim(),
          newPassword: forgotNewPassword,
        }),
      })

      let data: any = {}
      try {
        data = await response.json()
      } catch {
        data = {}
      }

      if (!response.ok) {
        setError(data.message || "Failed to reset password. Please check your OTP.")
        return
      }

      setSuccessMessage("Password reset successfully! You can now login with your new password.")
      setEmail(forgotEmail.trim())
      setPassword("")

      // Switch back to login form after brief delay
      setTimeout(() => {
        setMode("login")
        setForgotStep(1)
        setForgotOtp("")
        setForgotNewPassword("")
        setForgotConfirmPassword("")
        setSuccessMessage("Password reset successfully. Please log in.")
      }, 1500)
    } catch (err) {
      console.error("Reset password error:", err)
      setError("Unable to reset password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // ==================== CHANGE PASSWORD HANDLER ====================
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")

    if (!changeEmail.trim()) {
      setError("Email address is required.")
      return
    }

    if (!currentPassword) {
      setError("Please enter your current password.")
      return
    }

    if (changeNewPassword.length < 6) {
      setError("New password must be at least 6 characters long.")
      return
    }

    if (currentPassword === changeNewPassword) {
      setError("New password must be different from current password.")
      return
    }

    if (changeNewPassword !== changeConfirmPassword) {
      setError("New passwords do not match.")
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      }
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }

      const response = await fetch(`${BASE_URL}/auth/change-password`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          email: changeEmail.trim(),
          currentPassword,
          newPassword: changeNewPassword,
        }),
      })

      let data: any = {}
      try {
        data = await response.json()
      } catch {
        data = {}
      }

      if (!response.ok) {
        setError(data.message || "Failed to change password. Please check your current password.")
        return
      }

      setSuccessMessage("Password changed successfully!")
      setCurrentPassword("")
      setChangeNewPassword("")
      setChangeConfirmPassword("")

      setTimeout(() => {
        onClose()
      }, 1800)
    } catch (err) {
      console.error("Change password error:", err)
      setError("Unable to connect to server. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen && !loading) {
          setError("")
          setSuccessMessage("")
          onClose()
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-1">
            {mode === "login" && (
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
            )}
            {mode === "forgot-password" && (
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                <KeyRound className="w-6 h-6" />
              </div>
            )}
            {mode === "change-password" && (
              <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
            )}
          </div>

          <DialogTitle className="text-center text-2xl font-bold text-slate-900">
            {mode === "login" && "Login to Account"}
            {mode === "forgot-password" && (forgotStep === 1 ? "Forgot Password" : "Reset Password")}
            {mode === "change-password" && "Change Password"}
          </DialogTitle>

          <DialogDescription className="text-center text-sm text-slate-500">
            {mode === "login" && "Enter your email and password to access your account."}
            {mode === "forgot-password" &&
              (forgotStep === 1
                ? "Enter your registered email to receive a password reset OTP."
                : `Enter the 6-digit OTP sent to ${forgotEmail} and choose a new password.`)}
            {mode === "change-password" && "Enter your current password and choose a new password."}
          </DialogDescription>
        </DialogHeader>

        {/* Error Alert */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 animate-in fade-in">
            {error}
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ======================================================== */}
        {/* ======================= LOGIN VIEW ===================== */}
        {/* ======================================================== */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-4 pt-1">
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="login-email">Email Address</Label>
              <div className="relative">
                <Input
                  id="login-email"
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError("")
                  }}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">Password</Label>
                <button
                  type="button"
                  onClick={() => {
                    setError("")
                    setSuccessMessage("")
                    if (email) setForgotEmail(email)
                    setMode("forgot-password")
                  }}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline focus:outline-none"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
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
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Login Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 mt-2 shadow-sm"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            {/* Switch to Signup */}
            <div className="text-center text-sm text-slate-600 pt-2 border-t border-slate-100">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="text-blue-600 font-semibold hover:underline focus:outline-none"
                onClick={() => {
                  onClose()
                  onOpenSignup?.()
                }}
              >
                Sign up
              </button>
            </div>
          </form>
        )}

        {/* ======================================================== */}
        {/* ================== FORGOT PASSWORD VIEW ================= */}
        {/* ======================================================== */}
        {mode === "forgot-password" && (
          <div className="space-y-4 pt-1">
            {forgotStep === 1 ? (
              <form onSubmit={handleSendForgotOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="forgot-email">Registered Email Address</Label>
                  <div className="relative">
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="Enter your account email"
                      value={forgotEmail}
                      onChange={(e) => {
                        setForgotEmail(e.target.value)
                        setError("")
                      }}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 shadow-sm"
                >
                  {loading ? "Sending OTP..." : "Send Verification OTP"}
                </Button>

                <div className="flex items-center justify-between pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-slate-600 hover:text-slate-900"
                    onClick={() => {
                      setError("")
                      setSuccessMessage("")
                      setMode("login")
                    }}
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    Back to Login
                  </Button>

                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    className="text-blue-600 p-0 text-xs"
                    onClick={() => {
                      setError("")
                      setSuccessMessage("")
                      setMode("change-password")
                    }}
                  >
                    Know current password? Change it
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-3.5">
                {/* Email (Readonly with edit shortcut) */}
                <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  <span className="text-slate-600 truncate">{forgotEmail}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotStep(1)
                      setError("")
                      setSuccessMessage("")
                    }}
                    className="text-blue-600 hover:underline font-medium ml-2 shrink-0"
                  >
                    Change Email
                  </button>
                </div>

                {/* 6-Digit OTP */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="forgot-otp">6-Digit OTP</Label>
                    <button
                      type="button"
                      disabled={resendCooldown > 0 || loading}
                      onClick={handleResendForgotOtp}
                      className="text-xs text-blue-600 hover:underline disabled:text-slate-400 font-medium focus:outline-none"
                    >
                      {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
                    </button>
                  </div>
                  <Input
                    id="forgot-otp"
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    value={forgotOtp}
                    onChange={(e) => {
                      setForgotOtp(e.target.value.replace(/[^0-9]/g, ""))
                      setError("")
                    }}
                    required
                    className="tracking-widest font-mono text-center text-lg"
                  />
                </div>

                {/* New Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="forgot-new-password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="forgot-new-password"
                      type={showForgotNewPassword ? "text" : "password"}
                      placeholder="At least 6 characters"
                      value={forgotNewPassword}
                      onChange={(e) => {
                        setForgotNewPassword(e.target.value)
                        setError("")
                      }}
                      required
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-400 hover:text-slate-600"
                      onClick={() => setShowForgotNewPassword(!showForgotNewPassword)}
                      aria-label={showForgotNewPassword ? "Hide password" : "Show password"}
                    >
                      {showForgotNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="forgot-confirm-password">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="forgot-confirm-password"
                      type={showForgotConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter new password"
                      value={forgotConfirmPassword}
                      onChange={(e) => {
                        setForgotConfirmPassword(e.target.value)
                        setError("")
                      }}
                      required
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-400 hover:text-slate-600"
                      onClick={() => setShowForgotConfirmPassword(!showForgotConfirmPassword)}
                      aria-label={showForgotConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showForgotConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 shadow-sm"
                >
                  {loading ? "Resetting Password..." : "Reset Password & Login"}
                </Button>

                <div className="text-center pt-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-slate-600 hover:text-slate-900 text-xs"
                    onClick={() => {
                      setError("")
                      setSuccessMessage("")
                      setMode("login")
                    }}
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    Back to Login
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* ================== CHANGE PASSWORD VIEW ================= */}
        {/* ======================================================== */}
        {mode === "change-password" && (
          <form onSubmit={handleChangePassword} className="space-y-3.5 pt-1">
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="change-email">Email Address</Label>
              <Input
                id="change-email"
                type="email"
                placeholder="Enter your account email"
                value={changeEmail}
                onChange={(e) => {
                  setChangeEmail(e.target.value)
                  setError("")
                }}
                required
              />
            </div>

            {/* Current Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="current-password">Current Password</Label>
                <button
                  type="button"
                  onClick={() => {
                    setError("")
                    setSuccessMessage("")
                    if (changeEmail) setForgotEmail(changeEmail)
                    setMode("forgot-password")
                  }}
                  className="text-xs text-blue-600 hover:underline font-medium focus:outline-none"
                >
                  Forgot Current Password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter your existing password"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value)
                    setError("")
                  }}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-400 hover:text-slate-600"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-1.5">
              <Label htmlFor="change-new-password">New Password</Label>
              <div className="relative">
                <Input
                  id="change-new-password"
                  type={showChangeNewPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  value={changeNewPassword}
                  onChange={(e) => {
                    setChangeNewPassword(e.target.value)
                    setError("")
                  }}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-400 hover:text-slate-600"
                  onClick={() => setShowChangeNewPassword(!showChangeNewPassword)}
                  aria-label={showChangeNewPassword ? "Hide password" : "Show password"}
                >
                  {showChangeNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-1.5">
              <Label htmlFor="change-confirm-password">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="change-confirm-password"
                  type={showChangeConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter new password"
                  value={changeConfirmPassword}
                  onChange={(e) => {
                    setChangeConfirmPassword(e.target.value)
                    setError("")
                  }}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-400 hover:text-slate-600"
                  onClick={() => setShowChangeConfirmPassword(!showChangeConfirmPassword)}
                  aria-label={showChangeConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showChangeConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 shadow-sm"
            >
              {loading ? "Updating Password..." : "Update Password"}
            </Button>

            <div className="text-center pt-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-slate-600 hover:text-slate-900 text-xs"
                onClick={() => {
                  setError("")
                  setSuccessMessage("")
                  setMode("login")
                }}
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Back to Login
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
