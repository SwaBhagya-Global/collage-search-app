"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, X, Users, BookOpen, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CompareModalProps {
  open: boolean
  onClose: () => void
}

export default function CompareModal({ open, onClose }: CompareModalProps) {
  const [compareColleges, setCompareColleges] = useState<any[]>([])

  useEffect(() => {
    if (open) {
      // Load colleges from localStorage when modal opens
      const savedColleges = JSON.parse(localStorage.getItem("compareColleges") || "[]")
      setCompareColleges(savedColleges)
    }
  }, [open])

  const removeFromCompare = (collegeId: number) => {
    const updatedList = compareColleges.filter((college) => college.id !== collegeId)
    setCompareColleges(updatedList)
    localStorage.setItem("compareColleges", JSON.stringify(updatedList))

    // Dispatch event to update header count
    window.dispatchEvent(
      new CustomEvent("compareUpdated", {
        detail: { count: updatedList.length },
      }),
    )
  }

  const clearAll = () => {
    setCompareColleges([])
    localStorage.removeItem("compareColleges")

    // Dispatch event to update header count
    window.dispatchEvent(
      new CustomEvent("compareUpdated", {
        detail: { count: 0 },
      }),
    )
  }

  const comparisonCategories = [
    {
      title: "Basic Information",
      items: [
        { label: "Established", key: "established" },
        { label: "Type", key: "type" },
        { label: "Location", key: "location" },
        { label: "Rating", key: "rating" },
        { label: "Reviews", key: "reviews" },
      ],
    },
    {
      title: "Rankings & Fees",
      items: [
        { label: "Ranking", key: "ranking" },
        { label: "Total Fees", key: "fees" },
        { label: "Cutoff", key: "cutoff" },
      ],
    },
    {
      title: "Placements",
      items: [
        { label: "Average Package", key: "avgPackage" },
        { label: "Placement Rate", key: "placement" },
      ],
    },
  ]

  const getValue = (obj: any, path: string) => {
    return path.split(".").reduce((current, key) => current?.[key], obj)
  }

  const renderComparisonValue = (college: any, key: string) => {
    const value = getValue(college, key)

    if (!value) return <span className="text-gray-400">-</span>

    if (key === "rating") {
      return (
        <div className="flex items-center">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="font-semibold">{value}</span>
        </div>
      )
    }

    if (key === "ranking") {
      return <span className="font-bold text-blue-600">#{value}</span>
    }

    if (key === "fees" || key === "avgPackage") {
      return <span className="font-semibold text-green-600">{value}</span>
    }

    return <span className="font-medium">{value}</span>
  }

  if (compareColleges.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Compare Colleges</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4">📊</div>
            <h3 className="text-lg font-semibold mb-2">No colleges to compare</h3>
            <p className="text-gray-600 mb-6">Add colleges to your compare list to see detailed comparisons</p>
            <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
              Browse Colleges
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Compare Colleges ({compareColleges.length})</DialogTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAll}
              className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </DialogHeader>

        {/* College Headers */}
        <div
          className={`grid gap-6 mb-8 ${compareColleges.length === 1 ? "grid-cols-1 max-w-md mx-auto" : compareColleges.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}
        >
          {compareColleges.map((college) => (
            <Card key={college.id} className="relative overflow-hidden">
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 z-10 hover:bg-red-100"
                onClick={() => removeFromCompare(college.id)}
              >
                <X className="w-4 h-4 text-red-500" />
              </Button>

              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Image
                    src={college.image || "/placeholder.svg"}
                    alt={college.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{college.shortName || college.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {college.location}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center bg-green-100 px-2 py-1 rounded">
                        <Star className="w-4 h-4 fill-green-600 text-green-600 mr-1" />
                        <span className="font-semibold text-green-700">{college.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">({college.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="font-bold text-blue-600 text-sm">
                      {college.ranking ? `#${college.ranking}` : "-"}
                    </div>
                    <div className="text-xs text-gray-600">Ranking</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="font-bold text-green-600 text-sm">{college.placement || "-"}</div>
                    <div className="text-xs text-gray-600">Placement</div>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <div className="font-bold text-purple-600 text-sm">{college.fees}</div>
                    <div className="text-xs text-gray-600">Fees</div>
                  </div>
                </div>

                {/* Highlights */}
                {college.highlights && (
                  <div className="flex flex-wrap gap-2">
                    {college.highlights.slice(0, 3).map((highlight: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Comparison Table */}
        <div className="space-y-8">
          {comparisonCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <div
                        className={`grid gap-4 items-center py-3 ${compareColleges.length === 1 ? "grid-cols-2" : compareColleges.length === 2 ? "md:grid-cols-3" : "md:grid-cols-4"}`}
                      >
                        <div className="font-medium text-gray-700">{item.label}</div>
                        {compareColleges.map((college, collegeIndex) => (
                          <div key={collegeIndex} className="text-center">
                            {renderComparisonValue(college, item.key)}
                          </div>
                        ))}
                      </div>
                      {itemIndex < category.items.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Courses Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`grid gap-6 ${compareColleges.length === 1 ? "grid-cols-1" : compareColleges.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}
              >
                {compareColleges.map((college) => (
                  <div key={college.id}>
                    <h4 className="font-semibold mb-3">{college.shortName || college.name}</h4>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-sm mb-1">Available Courses:</div>
                      <div className="text-sm text-gray-600">{college.courses}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-8 pt-6 border-t">
          <Button className="bg-blue-600 hover:bg-blue-700 px-8">
            <BookOpen className="w-4 h-4 mr-2" />
            Download Comparison Report
          </Button>
          <Button variant="outline" className="px-8 bg-transparent">
            <Users className="w-4 h-4 mr-2" />
            Share Comparison
          </Button>
          <div
            className={`grid gap-2 sm:contents ${compareColleges.length === 1 ? "grid-cols-1" : compareColleges.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
          >
            {compareColleges.map((college) => (
              <Link key={college.id} href={`/colleges/${college.id}`}>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View {college.shortName || college.name}
                </Button>
              </Link>
            ))}
          </div>
          <Button variant="ghost" onClick={onClose} className="px-8">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
