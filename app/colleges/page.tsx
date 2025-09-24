"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Label } from "@/components/ui/label"
import CollegeCard from "@/components/college-card"
import Loader from "@/components/loader"
import BASE_URL from "@/app/config/api";
import { ApiCollege, CollegeCardProps } from "@/lib/types"


const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhatisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
]

export default function CollegesPage() {
  const searchParams = useSearchParams()
  console.log("searchParams",searchParams);
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("search") || "")
  const [filteredColleges, setFilteredColleges] = useState<any[]>([])
  const [filters, setFilters] = useState({
    state: searchParams?.get("state")?.replace(/-/g, " ") || "",
    category: searchParams?.get("category") || "",
    type: searchParams?.get("type") || "",
    fees: searchParams?.get("fees") || "",
  })
  const [visibleCount, setVisibleCount] = useState(15);
  const [colleges, setColleges] = useState<ApiCollege[]>([]);
  const [loading, setLoading] = useState(true);

  //filter fees
function parseFee(feeStr: string): number {
  if (!feeStr) return 0;

  const value = feeStr.trim().toUpperCase();

  // Handle words like "26 Lakhs"
  if (value.includes("LAKH") || value.includes("LAKHS") || value.endsWith("L")) {
    const num = parseFloat(value);
    return num * 100000; // 1 Lakh = 100000
  }

  // Handle Crores (1 Crore = 1 Cr = 10000000)
  if (value.includes("CRORE") || value.includes("CR")) {
    const num = parseFloat(value);
    return num * 10000000;
  }

  // Handle "K"
  if (value.endsWith("K")) {
    return parseFloat(value) * 1000;
  }

  // Fallback: plain number (e.g. "2600000")
  return parseFloat(value);
}
function getFeeRange(filterValue: string) {
  switch (filterValue) {
    case "any":
      return { min: 0, max: Infinity };

    case "free":
      return { min: 0, max: 0 };

    case "under-50K":
      return { min: 0, max: 50000 };

    case "50K-1L":
      return { min: 50000, max: 100000 };

    case "1L-2L":
      return { min: 100000, max: 200000 };

    case "2L-5L":
      return { min: 200000, max: 500000 };

    case "5L-10L":
      return { min: 500000, max: 1000000 };

    case "10L-20L":
      return { min: 1000000, max: 2000000 };

    case "above-20L":
      return { min: 2000000, max: Infinity };

    default:
      // handle if user directly passes something like "2L-5L"
      if (filterValue.includes("-")) {
        const [minStr, maxStr] = filterValue.split("-");
        return { min: parseFee(minStr), max: parseFee(maxStr) };
      }
      return { min: 0, max: Infinity };
  }
}

  useEffect(() => {
    async function fetchColleges() {
      try {
        const res = await fetch(`${BASE_URL}/api/colleges`); // 🔹 replace with your API endpoint
        // const data: ApiCollege[] = await res.json();
        const data = await res.json();

        setColleges(data.data);
      } catch (err) {
        console.error("Failed to fetch colleges", err);
      } finally {
        setLoading(false);
      }
    }

    fetchColleges();
  }, []);

  function mapApiToCard(apiCollege: ApiCollege, idx: number): CollegeCardProps["college"] {
    return {
      id: apiCollege._id, // or parseInt(apiCollege._id, 16) if you want unique id
      name: apiCollege.name,
      shortName: apiCollege.shortName,
      state: apiCollege.state,
      distric: apiCollege.distric,
      rating: apiCollege.rating,
      fees: apiCollege.courses?.[0]?.fees || "N/A",
      courses: apiCollege.courses.map(c => c.name).join(", "),
      images: apiCollege.images?.[0] || "/placeholder.svg", // fallback
      established: apiCollege.established,
      type: "Full Time", // map affiliation/type properly
      highlights: apiCollege.highlights,
      averagePackage: apiCollege.averagePackage,
      cutoff: "N/A",
      category: apiCollege.category || [],
    }
  }


  useEffect(() => {
    let filtered = colleges
    console.log(filters);

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (college) =>
          college?.name.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          college?.state?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          college?.distric?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          college?.shortName?.toLowerCase().includes(searchQuery?.toLowerCase()),
      )
    }

    // Apply category filter (match against course names)
    if (filters.category && filters.category !== "all") {
      const categoryLower = filters.category?.toLowerCase()
      filtered = filtered.filter((college) =>
        Array.isArray(college.courses) && college.courses.some((c) => c.name?.toLowerCase().includes(categoryLower)),
      )
    }

    // Apply state filter
    if (filters.state && filters.state !== "all") {
      filtered = filtered?.filter((college) => college?.state?.toLowerCase().includes(filters?.state?.toLowerCase()))
    }

    // Apply type filter
    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter((college) => college.type === filters.type)
    }
    if (filters.fees && filters.fees !== "any") {
      console.log("h",colleges);
  const { min, max } = getFeeRange(filters.fees);
  filtered = filtered.filter((college) =>
    Array.isArray(college.courses) &&
    college.courses.some((course) => {
      const courseFee = parseFee(course.fees); // "2L", "50K" etc
      return courseFee >= min && courseFee <= max;
    })
  );
}


    filtered = [...filtered].sort((a, b) => {
  // Handle nulls last
  if (a.ranking == null && b.ranking == null) return 0;
  if (a.ranking == null) return 1;
  if (b.ranking == null) return -1;

  // Handle 0s after positive rankings
  if (a.ranking === 0 && b.ranking === 0) return 0;
  if (a.ranking === 0) return 1;
  if (b.ranking === 0) return -1;

  // Normal ascending order for positive rankings
  return a.ranking - b.ranking;
});

    setVisibleCount(15);
    setFilteredColleges(filtered)
  }, [searchQuery, filters, colleges])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is handled by useEffect
  }

  const clearFilters = () => {
    setFilters({
      state: "",
      category: "",
      type: "",
      fees: "",
    })
    setSearchQuery("")
  }

  // if (loading) return <Loader />;
  return (
    <div className="min-h-screen bg-gray-50">
      {loading && (
        <Loader overlay={true} className="z-50" />
      )}

      {/* Search Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 lg:py-6">
          <h1 className="text-2xl lg:text-3xl font-bold mb-4">Find Your Perfect College</h1>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search colleges by name, state, or distric..."
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <div className="flex gap-2">
              <Select
                value={filters.state}
                onValueChange={(value) => {console.log(value),setFilters((prev) => ({ ...prev, state: value }))}}
              >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All India" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All India</SelectItem>
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
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
                    <SelectItem value="MBA">MBA</SelectItem>
                    <SelectItem value="PGDM">PGDM</SelectItem>
                  </SelectContent>
                </Select>

                {/* Mobile Filters */}
                {/* <Sheet>
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
              </Sheet> */}

                {/* Desktop More Filters */}
                {/* <Button variant="outline" className="hidden lg:flex h-12 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button> */}
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
            {filters.state !== "all" && ` in ${filters.state}`}
            {filters.type !== "all" && ` of type ${filters.type}`}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {filteredColleges.slice(0, visibleCount).map((college, i) => (
            <CollegeCard key={college._id ?? i} college={mapApiToCard(college, i)} />
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
              <Button onClick={() => setVisibleCount(visibleCount + 10)}>
                Load More
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
