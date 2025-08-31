"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("colleges")
  const [state, setState] = useState("all-india")
  const [category, setCategory] = useState("all-categories")
  const [specialization, setSpecialization] = useState("specialization")
  const [collegeType, setCollegeType] = useState("all-types")
  const [feesRange, setFeesRange] = useState("any")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery.trim()) params.set("search", searchQuery.trim())
    if (state !== "all-india") params.set("state", state)
    if (category !== "all-categories") params.set("category", category)
    if (collegeType !== "all-types") params.set("type", collegeType)
    if (specialization !== "specialization") params.set("specialization", specialization)
    if (feesRange !== "any") params.set("fees", feesRange)

    router.push(`/${activeTab}?${params.toString()}`)
  }

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
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

  return (
    <section className="relative h-[800px] sm:h-[500px] flex items-center justify-center">

      {/* Real College Building Photo Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80')`,
        }}
      ></div>
      {/* Simple overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Simple Header */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Find Your Best MBA / PGDM College</h1>
          <p className="text-lg text-white/90 mb-8">Search colleges across India</p>

          {/* Simple Search - Only Colleges and Courses */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* <TabsList className="grid w-full max-w-sm mx-auto grid-cols-2 mb-6 bg-white/90">
              <TabsTrigger value="colleges" className="text-sm">
                Colleges
              </TabsTrigger>
              <TabsTrigger value="courses" className="text-sm">
                Courses
              </TabsTrigger>
            </TabsList> */}  
 
            <TabsContent value="colleges">
              <Card className="bg-white/95 rounded-lg p-6 max-w-5xl mx-auto">
                <CardContent className="p-0">
                  <form onSubmit={handleSearch} className="space-y-6">
                    {/* All 5 Filters in One Row - Added Search Input */}
                    <div className="flex justify-center items-center min-h-[45px]">
                      <div className="relative w-[400px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          placeholder="Search by name, state or course..."
                          className="h-12 w-full bg-white border border-gray-300 pl-10 rounded"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                      {/* <div className="relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                          placeholder="Search by name, location or course..."
                          className="h-12 bg-white border-gray-300 pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div> */}

                      <Select value={state} onValueChange={setState}>
                        <SelectTrigger className="h-12 bg-white border-gray-300">
                          <SelectValue placeholder="All India" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-india">All India</SelectItem>
                          {indianStates.map((state) => (
                            <SelectItem key={state} value={state.replace(/\s+/g, "-")}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="h-12 bg-white border-gray-300">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-categories">All Categories</SelectItem>
                          <SelectItem value="mba">MBA</SelectItem>
                          <SelectItem value="pgdm">PGDM</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={specialization} onValueChange={setSpecialization}>
                        <SelectTrigger className="h-12 bg-white border-gray-300">
                          <SelectValue placeholder="Select Specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="specialization">All Specialization</SelectItem>
                          <SelectItem value="hr">HR</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={collegeType} onValueChange={setCollegeType}>
                        <SelectTrigger className="h-12 bg-white border-gray-300">
                          <SelectValue placeholder="College Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-types">All Types</SelectItem>
                          <SelectItem value="full-time">Full Time</SelectItem>
                          <SelectItem value="part-time">Part Time</SelectItem>
                          <SelectItem value="executive">Executive</SelectItem>
                          <SelectItem value="online">Online</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={feesRange} onValueChange={setFeesRange}>
                        <SelectTrigger className="h-12 bg-white border-gray-300">
                          <SelectValue placeholder="Fees Range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Fees</SelectItem>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="under-50k">Under ₹50K</SelectItem>
                          <SelectItem value="50k-1l">₹50K - ₹1L</SelectItem>
                          <SelectItem value="1l-2l">₹1L - ₹2L</SelectItem>
                          <SelectItem value="2l-5l">₹2L - ₹5L</SelectItem>
                          <SelectItem value="5l-10l">₹5L - ₹10L</SelectItem>
                          <SelectItem value="10l-20l">₹10L - ₹20L</SelectItem>
                          <SelectItem value="above-20l">Above ₹20L</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 h-12 px-12 text-lg">
                      <Search className="w-5 h-5 mr-2" />
                      Search Colleges
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses">
              <Card className="bg-white/95 rounded-lg p-6 max-w-5xl mx-auto">
                <CardContent className="p-0">
                  <form onSubmit={handleSearch} className="space-y-6">
                    {/* Course Filters with Search */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                          placeholder="Search courses by name or specialization..."
                          className="h-12 bg-white border-gray-300 pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>

                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="h-12 bg-white border-gray-300">
                          <SelectValue placeholder="Course Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-courses">All Courses</SelectItem>
                          <SelectItem value="engineering">Engineering (B.Tech/M.Tech)</SelectItem>
                          <SelectItem value="pgdm">PGDM/MBA</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={state} onValueChange={setState}>
                        <SelectTrigger className="h-12 bg-white border-gray-300">
                          <SelectValue placeholder="All India" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-india">All India</SelectItem>
                          {indianStates.map((state) => (
                            <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, "-")}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 h-12 px-12 text-lg">
                      <Search className="w-5 h-5 mr-2" />
                      Search Courses
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
