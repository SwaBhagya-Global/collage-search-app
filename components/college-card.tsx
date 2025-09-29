"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Heart, Users, TrendingUp, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import FormModal from "./FormModal"
import { CollegeCardProps } from "@/lib/types"


export default function CollegeCard({ college }: CollegeCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isCompared, setIsCompared] = useState(false)
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsCompared(!isCompared)

    // Get existing compare list from localStorage
    const compareList = JSON.parse(localStorage.getItem("compareColleges") || "[]")

    if (!isCompared) {
      // Add to compare list
      if (compareList.length < 3) {
        const newCompareList = [...compareList, college]
        localStorage.setItem("compareColleges", JSON.stringify(newCompareList))

        // Dispatch custom event to update header
        window.dispatchEvent(
          new CustomEvent("compareUpdated", {
            detail: { count: newCompareList.length },
          }),
        )
      } else {
        alert("You can compare maximum 3 colleges at a time")
        return
      }
    } else {
      // Remove from compare list
      const newCompareList = compareList.filter((c: any) => c.id !== college.id)
      localStorage.setItem("compareColleges", JSON.stringify(newCompareList))

      // Dispatch custom event to update header
      window.dispatchEvent(
        new CustomEvent("compareUpdated", {
          detail: { count: newCompareList.length },
        }),
      )
    }
  }

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  return (
    <Card className="group cursor-pointer bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-sm">
      {/* Image with overlay */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={college.images}
          alt={college.name}
          width={400}
          height={200}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Top badges and actions */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            {college.featured && <Badge className="bg-orange-500 text-white text-xs px-2 py-1">⭐ Featured</Badge>}
            {college.ranking && college.ranking <= 10 && (
              <Badge className="bg-yellow-500 text-white text-xs px-2 py-1">
                <Award className="w-3 h-3 mr-1" />#{college.ranking}
              </Badge>
            )}
          </div>

          <button
            onClick={handleLike}
            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`} />
          </button>
        </div>

        {/* Bottom info on image */}
        <div className="absolute bottom-3 left-3 right-3">
          <Link
            href={`/colleges/${college?.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="block"
          >
            <h3 className="text-white font-bold text-xs mb-2 line-clamp-1 hover:underline">
              {college.name}
            </h3>
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-white/90 text-xs">
              <MapPin className="w-3 h-3 mr-1" />
              {`${college.distric}, ${college.state}`}
            </div>
            <div className="flex items-center bg-green-500 px-2 py-1 rounded-full text-white text-xs">
              <Star className="w-3 h-3 fill-white mr-1" />
              {college.rating}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed content section */}
      <CardContent className="p-4">
        {/* College info */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Est. {college.established}</span>
            {/* <Badge variant="outline" className="text-xs">
              {college.type}
            </Badge> */}
          </div>

          {/* <div className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Courses:</span> {college.courses}
          </div> */}

          {college.category && (
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Category:</span> {college.category.join(', ')}
            </div>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="font-bold text-blue-600 text-sm">{college.fees
                ? college.fees.toString().includes("Lakhs")
                  ? college.fees
                  : `${college.fees} Lakhs`
                : ""}</div>
            <div className="text-xs text-gray-600">Total Fees</div>
          </div>
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="font-bold text-green-600 text-sm">
              {college.averagePackage
                ? college.averagePackage.toString().includes("LPA")
                  ? college.averagePackage
                  : `${college.averagePackage} LPA`
                : ""}
            </div>
            <div className="text-xs text-gray-600">Avg Package</div>
          </div>


        </div>

        {/* Placement info */}
        {college.placement && (
          <div className="flex items-center justify-between text-sm mb-3">
            <div className="flex items-center text-gray-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>Placement: {college.placement}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-1" />
              {/* <span>{college.reviews}</span> */}
            </div>
          </div>
        )}

        {/* Highlights */}
        {college.highlights && college.highlights.filter(h => h.trim() !== "").length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {college.highlights.slice(0, 2).map((highlight, index) => (
                <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                  {highlight}
                </Badge>
              ))}
              {college.highlights.filter(h => h.trim() !== "").length > 2 && (
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  +{college.highlights.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          <Link href={`/colleges/${college?.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex-1">
            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-xs">
              View Details
            </Button>
          </Link>
          <div className="flex-1">
            <Button
              size="sm"
              className="w-full bg-blue-600 hover:bg-blue-700 text-xs text-white"
              onClick={() => setIsApplyOpen(true)}
            >
              Apply
            </Button>

            {/* Apply Modal */}
            <FormModal
              isOpen={isApplyOpen}
              onClose={() => setIsApplyOpen(false)}
              title="Apply Now"
              subtitle="Please fill out the form to apply for admission."
              buttonText="Apply Now"
              showEmail={true}
              flag={"apply_now"}
              applyLink={college?.applyLink || college?.website}
              collegeName={college?.name}
            />
          </div>
          <Button
            size="sm"
            variant="outline"
            className={`px-3 text-xs ${isCompared
              ? "bg-orange-100 border-orange-500 text-orange-700"
              : "bg-transparent border-gray-300 text-gray-700"
              }`}
            onClick={handleCompare}
          >
            {isCompared ? "Added" : "Compare"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
