"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import CollegeCard from "@/components/college-card"

export default function CollegesPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("search") || "")
  const [filteredColleges, setFilteredColleges] = useState<any[]>([])
  const [filters, setFilters] = useState({
    location: "",
    category: searchParams?.get("category") || "",
    type: "",
    fees: "",
    rating: "",
  })

  const allColleges = [
    {
      id: 1,
      name: "IZEE BUSINESS SCHOOL",
      university: "Bangalore University, Bengaluru",
      location: "BANGALORE URBAN",
      address: "PLOT 325-B,PART A,BOMMASANDRA-JIGANI LINK ROAD,JIGANI INDUSTRIAL AREA,JIGANI POST,ANEKAL TALUK,BENGALURU 560105",
      rating: 4.8,
      fees: "₹7.25 Lakhs",
      courses: "MBA, ",
      image: "/placeholder.svg?height=200&width=300",
      established: 1961,
      type: "Public/Government",
      category: "engineering",
      contactNumber: "8050002929, 9606043002",
      email: "admin@izeeinstitutions.com",
      website: "https://izeeinstitutions.com",
    },
    {
      id: 2,
      name: "All India Institute of Medical Sciences",
      location: "New Delhi",
      rating: 4.9,
      reviews: 1923,
      fees: "₹5,500",
      courses: "MBBS, MD, MS",
      image: "/placeholder.svg?height=200&width=300",
      established: 1956,
      type: "Public/Government",
      category: "medical",
    },
  ]

  useEffect(() => {
    let filtered = allColleges

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (college) =>
          college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          college.courses.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter((college) => college.category === filters.category)
    }

    // Apply location filter
    if (filters.location && filters.location !== "all") {
      filtered = filtered.filter((college) => college.location.toLowerCase().includes(filters.location.toLowerCase()))
    }

    // Apply type filter
    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter((college) => college.type === filters.type)
    }

    // Apply rating filter
    if (filters.rating && filters.rating !== "any") {
      const minRating = Number.parseFloat(filters.rating)
      filtered = filtered.filter((college) => college.rating >= minRating)
    }

    setFilteredColleges(filtered)
  }, [searchQuery, filters])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is handled by useEffect
  }

  const clearFilters = () => {
    setFilters({
      location: "",
      category: "",
      type: "",
      fees: "",
      rating: "",
    })
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Search Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 lg:py-6">
          <h1 className="text-2xl lg:text-3xl font-bold mb-4">Find Your Perfect College</h1>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search colleges by name, location, or course..."
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <div className="flex gap-2">
              <Select
                value={filters.location}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, location: value }))}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="chennai">Chennai</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.category}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="commerce">Commerce</SelectItem>
                  <SelectItem value="law">Law</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filters */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden bg-transparent">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Colleges</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div>
                      <Label className="text-sm font-medium">College Type</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="public"
                            checked={filters.type === "Public/Government"}
                            onCheckedChange={(checked) =>
                              setFilters((prev) => ({ ...prev, type: checked ? "Public/Government" : "" }))
                            }
                          />
                          <Label htmlFor="public">Public/Government</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="private"
                            checked={filters.type === "Private"}
                            onCheckedChange={(checked) =>
                              setFilters((prev) => ({ ...prev, type: checked ? "Private" : "" }))
                            }
                          />
                          <Label htmlFor="private">Private</Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Minimum Rating</Label>
                      <Select
                        value={filters.rating}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, rating: value }))}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Rating</SelectItem>
                          <SelectItem value="4.5">4.5+ Stars</SelectItem>
                          <SelectItem value="4.0">4.0+ Stars</SelectItem>
                          <SelectItem value="3.5">3.5+ Stars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button onClick={clearFilters} variant="outline" className="w-full bg-transparent">
                      Clear All Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Desktop More Filters */}
              <Button variant="outline" className="hidden lg:flex h-12 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <p className="text-gray-600">
            Showing {filteredColleges.length} colleges
            {searchQuery && ` for "${searchQuery}"`}
            {filters.category !== "all" && ` in ${filters.category}`}
            {filters.location !== "all" && ` in ${filters.location}`}
            {filters.type !== "all" && ` of type ${filters.type}`}
            {filters.rating !== "any" && ` with minimum rating ${filters.rating}`}
          </p>
          {/* <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by Relevance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="fees-low">Fees: Low to High</SelectItem>
              <SelectItem value="fees-high">Fees: High to Low</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select> */}
        </div>

        {/* College Grid - 4x4 layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {filteredColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No colleges found</div>
            <p className="text-gray-400 mb-6">Try adjusting your search criteria or filters</p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {filteredColleges.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">1</Button>
              <Button>2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">4</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
