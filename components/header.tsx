"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, User, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import LoginModal from "./login-modal"
import SignupModal from "./signup-modal"
import CompareModal from "./compare-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import { LogOut, Settings, UserCircle, LayoutDashboard } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [showCompare, setShowCompare] = useState(false)
  const [compareCount, setCompareCount] = useState(0)
  const [user, setUser] = useState<any>(null)

  // Prompt guests to sign up after they have had time to browse the site.
  // Authentication is checked when the timer fires so logging in during the
  // two-minute window also prevents the prompt from being shown.
  useEffect(() => {
    const signupTimer = window.setTimeout(() => {
      const isAuthenticated = Boolean(
        localStorage.getItem("token") || localStorage.getItem("user")
      )

      if (!isAuthenticated) {
        setShowSignup(true)
      }
    }, 60 * 1000)

    return () => window.clearTimeout(signupTimer)
  })

useEffect(() => {
  const compareList = JSON.parse(
    localStorage.getItem("compareColleges") || "[]"
  );

  setCompareCount(compareList.length);

  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }

  const handleCompareUpdate = (event: any) => {
    setCompareCount(event.detail.count);
  };

  const handleUserLogin = () => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }

    // A guest may have the timed sign-up prompt open when they log in.
    setShowSignup(false)
  };

  window.addEventListener("compareUpdated", handleCompareUpdate);
  window.addEventListener("userLogin", handleUserLogin);

  return () => {
    window.removeEventListener("compareUpdated", handleCompareUpdate);
    window.removeEventListener("userLogin", handleUserLogin);
  };
}, []);

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    setUser(null)

    window.location.href = "/"
  }

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Simple Main Header */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <img src="../logo-mba.png" width={150} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/blogs"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group py-2"
              >
                Blogs
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/faqs"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group py-2"
              >
                FAQs
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
              {/* <Link
                href="/exams"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group py-2"
              >
                Exams
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/news"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group py-2"
              >
                News
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/reviews"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group py-2"
              >
                Reviews
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/qa"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group py-2"
              >
                Q&A
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link> */}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Compare Button */}
              {/* <Link
                href="/blogs"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group py-2"
               >
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/faqs"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group py-2"
               >
                FAQs
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link> */}
              <Button
                variant="ghost"
                size="sm"
                className="relative hidden md:flex"
                onClick={() => setShowCompare(true)}
              >
                <Heart className="w-4 h-4" />
                <span className="hidden lg:inline ml-2">Compare</span>
                {compareCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center bg-red-500 text-xs">
                    {compareCount}
                  </Badge>
                )}
              </Button>

              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center space-x-3">

                {user ? (

                  <DropdownMenu>

                    <DropdownMenuTrigger asChild>

                      <Button variant="ghost" className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>

                        <div className="hidden lg:block text-left">
                          <p className="font-semibold">{user.name}</p>
                        </div>

                      </Button>

                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-60">

                      {/* <DropdownMenuItem asChild>
                        <Link href="/profile">
                          <UserCircle className="mr-2 h-4 w-4" />
                          My Profile
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem> */}

                      <DropdownMenuItem asChild>
                        <Link href="/saved-colleges">
                          ❤️ Saved Colleges
                        </Link>
                      </DropdownMenuItem>

                      {/* <DropdownMenuItem asChild>
                        <Link href="/compare">
                          Compare Colleges
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href="/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem> */}

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-600 cursor-pointer"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>

                    </DropdownMenuContent>

                  </DropdownMenu>

                ) : (

                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowLogin(true)}
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Button>

                    <Button
                      size="sm"
                      onClick={() => setShowSignup(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Sign Up
                    </Button>
                  </>

                )}

              </div>

              {/* Mobile Menu Button */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <Link href="/" className="flex items-center space-x-3">
                      <img src="../logo-mba.png" width={150} />
                    </Link>

                    {/* Mobile Navigation */}
                    <div className="flex flex-col space-y-2 mt-6 flex-1">
                      <Link
                        href="/blogs"
                        className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        📰 Blogs
                      </Link>
                      <Link
                        href="/faqs"
                        className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        ❓ FAQs
                      </Link>
                      
                      {/* <Link
                        href="/exams"
                        className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        📝 Exams
                      </Link>
                      <Link
                        href="/news"
                        className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        📰 News
                      </Link>
                      <Link
                        href="/reviews"
                        className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        ⭐ Reviews
                      </Link>
                      <Link
                        href="/qa"
                        className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        ❓ Q&A
                      </Link> */}

                      {/* Mobile Compare Button */}
                      <Button
                        variant="ghost"
                        className="justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50 py-3 px-4"
                        onClick={() => {
                          setShowCompare(true)
                          setIsMenuOpen(false)
                        }}
                      >
                        <Heart className="w-4 h-4 mr-3" />
                        Compare Colleges
                        {compareCount > 0 && <Badge className="ml-auto bg-red-500">{compareCount}</Badge>}
                      </Button>

                      {/* Mobile Auth Buttons */}
                        {user ? (
                          <>
                            <div className="border-t pt-5 mt-5">
                              <div className="flex items-center gap-3 px-4">

                                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                                  {user.name?.charAt(0).toUpperCase()}
                                </div>

                                <div>
                                  <p className="font-semibold">{user.name}</p>
                                  <p className="text-sm text-gray-500">{user.email}</p>
                                </div>

                              </div>
                              <br></br>

                              <Button
                                variant="ghost"
                                className="w-full justify-start mt-4"
                                asChild
                              >
                                <Link href="/saved-colleges">❤️ Saved Colleges</Link>
                              </Button>
                              

                              <Button
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={handleLogout}
                              >
                                Logout
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                              onClick={() => {
                                setShowLogin(true)
                                setIsMenuOpen(false)
                              }}
                            >
                              <User className="w-4 h-4 mr-2" />
                              Login
                            </Button>
                            <Button
                              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                              onClick={() => {
                                setShowSignup(true)
                                setIsMenuOpen(false)
                              }}
                            >
                              Sign Up
                            </Button>
                          </>
                        )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onOpenSignup={() => {
          setShowLogin(false)
          setShowSignup(true)
        }}
      />
      <SignupModal
        open={showSignup}
        onClose={() => setShowSignup(false)}
        onOpenLogin={() => {
          setShowSignup(false)
          setShowLogin(true)
        }}
      />
      <CompareModal open={showCompare} onClose={() => setShowCompare(false)} />
    </>
  )
}
