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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [showCompare, setShowCompare] = useState(false)
  const [compareCount, setCompareCount] = useState(0)

  useEffect(() => {
    // Load initial compare count
    const compareList = JSON.parse(localStorage.getItem("compareColleges") || "[]")
    setCompareCount(compareList.length)

    // Listen for compare updates
    const handleCompareUpdate = (event: any) => {
      setCompareCount(event.detail.count)
    }

    window.addEventListener("compareUpdated", handleCompareUpdate)

    return () => {
      window.removeEventListener("compareUpdated", handleCompareUpdate)
    }
  }, [])

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Simple Main Header */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              {/* <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EduFinder
                </span>
                <div className="text-xs text-gray-500 -mt-1">Find Your Perfect College</div>
              </div> */}
              <img src="../logo-mba.png" width={150}/>
            </Link>

            {/* Desktop Navigation */}
            {/* <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/colleges"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group py-2"
              >
                Colleges
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/courses"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group py-2"
              >
                Courses
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link
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
              </Link>
            </nav> */}

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Compare Button */}
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
              {/* <div className="hidden md:flex items-center space-x-3">
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
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Sign Up
                </Button>
              </div> */}

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
                    <div className="flex items-center space-x-3 pb-6 border-b">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-xl">E</span>
                      </div>
                      <div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          EduFinder
                        </span>
                        <div className="text-xs text-gray-500">Find Your Perfect College</div>
                      </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="flex flex-col space-y-2 mt-6 flex-1">
                      {/* <Link
                        href="/colleges"
                        className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        🏫 Colleges
                      </Link>
                      <Link
                        href="/courses"
                        className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        📚 Courses
                      </Link>
                      <Link
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
                      {/* <div className="border-t pt-6 mt-auto space-y-3">
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
                      </div> */}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
      <SignupModal open={showSignup} onClose={() => setShowSignup(false)} />
      <CompareModal open={showCompare} onClose={() => setShowCompare(false)} />
    </>
  )
}
