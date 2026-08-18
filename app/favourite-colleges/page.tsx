"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Heart, Search, Trash2, ArrowRight, Sparkles, Building2, ChevronRight, SlidersHorizontal } from "lucide-react"
import CollegeCard from "@/components/college-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getFavouriteColleges, clearAllFavourites, FavouriteCollege } from "@/lib/favourites"

export default function FavouriteCollegesPage() {
  const [colleges, setColleges] = useState<FavouriteCollege[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<string>("recent")

  // Load from localStorage on mount & listen for changes
  useEffect(() => {
    const loadFavourites = () => {
      const items = getFavouriteColleges()
      setColleges(items)
      setIsLoaded(true)
    }

    loadFavourites()

    const handleUpdate = (event: any) => {
      if (Array.isArray(event.detail?.favourites)) {
        setColleges(event.detail.favourites)
      } else {
        loadFavourites()
      }
    }

    window.addEventListener("favouritesUpdated", handleUpdate)
    window.addEventListener("storage", loadFavourites)

    return () => {
      window.removeEventListener("favouritesUpdated", handleUpdate)
      window.removeEventListener("storage", loadFavourites)
    }
  }, [])

  const handleClearAll = () => {
    clearAllFavourites()
    setColleges([])
  }

  // Helper to parse fee numbers for sorting
  const parseFee = (feeStr?: string): number => {
    if (!feeStr) return 0
    const str = String(feeStr).toUpperCase()
    if (str.includes("LAKH") || str.includes("LAKHS") || str.endsWith("L")) {
      return (parseFloat(str) || 0) * 100000
    }
    if (str.includes("CRORE") || str.includes("CR")) {
      return (parseFloat(str) || 0) * 10000000
    }
    return parseFloat(str.replace(/[^0-9.]/g, "")) || 0
  }

  // Filter & Sort
  const filteredAndSortedColleges = useMemo(() => {
    let result = [...colleges]

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter((c) => {
        const nameMatch = c.name?.toLowerCase().includes(query)
        const cityMatch = c.distric?.toLowerCase().includes(query)
        const stateMatch = c.state?.toLowerCase().includes(query)
        const categoryMatch = Array.isArray(c.category)
          ? c.category.some((cat) => cat.toLowerCase().includes(query))
          : false
        return nameMatch || cityMatch || stateMatch || categoryMatch
      })
    }

    // Sorting
    if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    } else if (sortBy === "fees-low") {
      result.sort((a, b) => parseFee(a.fees) - parseFee(b.fees))
    } else if (sortBy === "fees-high") {
      result.sort((a, b) => parseFee(b.fees) - parseFee(a.fees))
    } else if (sortBy === "name") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""))
    }

    return result
  }, [colleges, searchQuery, sortBy])

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Breadcrumb & Header Banner */}
      <section className="bg-white border-b border-slate-200/80 shadow-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 mb-4">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-medium">Favourite Colleges</span>
          </nav>

          {/* Hero Content */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shadow-xs">
                  <Heart className="w-5 h-5 fill-red-500" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Favourite Colleges
                </h1>
              </div>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
                Your shortlisted colleges saved for quick comparison, reviews, and admission applications.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="sm" className="border-slate-300 hover:bg-slate-50">
                <Link href="/colleges">
                  <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                  Browse Colleges
                </Link>
              </Button>

              {colleges.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="w-4 h-4 mr-1.5" />
                      Clear All
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear all favourite colleges?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove all {colleges.length} shortlisted colleges from your favourites list.
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleClearAll}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Clear All
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Skeleton while loading */}
        {!isLoaded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-xs border border-slate-200/80 animate-pulse"
              >
                <div className="h-48 bg-slate-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="h-10 bg-slate-100 rounded" />
                    <div className="h-10 bg-slate-100 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {isLoaded && colleges.length === 0 && (
          <div className="max-w-2xl mx-auto text-center py-16 px-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm mt-4">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center ring-8 ring-red-50/50">
              <Heart className="w-10 h-10 text-red-500 fill-red-400 stroke-[1.5]" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              No Favourite Colleges Yet
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
              You haven't saved any colleges to your favourites. Browse our comprehensive college directory and tap the heart icon on any card to shortlist them here.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                asChild
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20 px-6"
              >
                <Link href="/colleges">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Explore Top Colleges
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Saved Colleges View */}
        {isLoaded && colleges.length > 0 && (
          <>
            {/* Filter & Sort Controls */}
            <div className="bg-white rounded-xl p-4 mb-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search in favourites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-slate-50 border-slate-200 focus:bg-white text-sm"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <div className="flex items-center text-xs text-slate-500 font-medium hidden sm:flex">
                  <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" />
                  Sort by:
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48 bg-slate-50 border-slate-200 text-xs sm:text-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recently Added</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="fees-low">Fees: Low to High</SelectItem>
                    <SelectItem value="fees-high">Fees: High to Low</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results count indicator */}
            {searchQuery && (
              <div className="flex items-center justify-between mb-4 text-xs text-slate-600 px-1">
                <span>
                  Showing {filteredAndSortedColleges.length} of {colleges.length} saved colleges
                </span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* No Search Results */}
            {filteredAndSortedColleges.length === 0 && searchQuery && (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8">
                <p className="text-slate-700 font-medium mb-2">No colleges matched &ldquo;{searchQuery}&rdquo;</p>
                <p className="text-slate-500 text-xs mb-4">Try checking for typos or searching by state or city</p>
                <Button variant="outline" size="sm" onClick={() => setSearchQuery("")}>
                  Reset Search
                </Button>
              </div>
            )}

            {/* College Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedColleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
