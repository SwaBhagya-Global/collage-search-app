"use client"

import Link from "next/link"
import { ChevronRight, TrendingUp, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import SearchSection from "@/components/search-section"
import CollegeCard from "@/components/college-card"
import { useEffect, useState } from "react"
import Loader from "@/components/loader"
import Image from "next/image"
import AdBanner from "@/components/AdBanner"
import BASE_URL from "./config/api"
interface ApiCollege {
  _id: string
  name: string
  shortName: string
  state: string
  affiliation?: string
  address?: string
  rating: number
  established:number
  intake?: string
  images: string[]
  highlights: string[]
  courses: {
    name: string
    duration: string
    fees: string
    eligibility: string
    seats: number
    _id: string
  }[]
  facilities?: string[]
  admissionProcess?: string[]
  links?: {
    website?: string
    _id: string
  }
  averagePackage: string
  highestPackage: string
  topRecruiters: string[]
  createdAt: string
  updatedAt: string
  contact?: {
    email?: string
    _id: string
  }
}

interface CollegeCardProps {
  college: {
    id: string
    name: string
    shortName?: string
    state: string
    rating: number
    fees: string
    courses: string
    images: string
    featured?: boolean
    established: number
    type: string
    ranking?: number
    placement?: string
    averagePackage?: string
    highlights?: string[]
    cutoff?: string
  }
}

export default function HomePage() {
  const [topRatedColleges, setTopRatedColleges] = useState<ApiCollege[]>([]);
  const [featuredColleges, setfeaturedColleges] = useState<ApiCollege[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchColleges() {
      try {
        const res = await fetch(`${BASE_URL}/api/colleges`); // 🔹 replace with your API endpoint
        // const data: ApiCollege[] = await res.json();
        const data = await res.json();
        // 🔹 Filter top rated colleges (rating 4.5 or 5)
        const topRated = data.data
          .filter((college: ApiCollege) => college.rating >= 4.5)
          .sort((a: ApiCollege, b: ApiCollege) => b?.rating - a?.rating); // Sort in descending order

        setTopRatedColleges(topRated);
        setfeaturedColleges(data.data);
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
      rating: apiCollege.rating,
      fees: apiCollege.courses?.[0]?.fees || "N/A",
      courses: apiCollege.courses.map(c => c.name).join(", "),
      images: apiCollege.images?.[0] || "/placeholder.svg", // fallback
      established: apiCollege.established,
      type: apiCollege.affiliation || "Private", // map affiliation/type properly
      highlights: apiCollege.highlights,
      averagePackage: apiCollege.averagePackage,
      cutoff: "N/A",
    }
  }

  // if (loading) return <Loader/>;

  return (
    <div className="min-h-screen bg-white relative">
      {/* Loader Overlay */}
      {loading && (
        <Loader overlay={true} className="z-50" />
      )}

      {/* Always visible content */}
      <SearchSection />
      <section className="py-8">
        <div className="container mx-auto px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center flex-wrap">
                Trending Colleges
                <span className="ml-2">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                </span>
              </h2>
              <p className="text-gray-600">Most popular colleges this month</p>
            </div>
            <Link
              href="/colleges"
              className="flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredColleges.slice(0, 12).map((college, i) => (
              <CollegeCard
                key={college._id}
                college={mapApiToCard(college, i)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="flex justify-center">
        {/* <Image
          src={"https://tpc.googlesyndication.com/simgad/18114101648311561798"}
          alt={'ads'}
          width={800}
          height={200}
        /> */}
        <AdBanner />
      </section>
      {/* Top Rated Colleges */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center">
                <Award className="w-6 h-6 mr-2 text-yellow-500" />
                Top Rated Colleges
              </h2>
              <p className="text-gray-600">Highest rated by students and alumni</p>
            </div>
            <Link
              href="/colleges?sort=rating"
              className="flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRatedColleges.slice(0, 12).map((college, i) => (
              <CollegeCard key={college._id} college={mapApiToCard(college, i)} />
            ))}
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Dream College? 🎯</h2>
          <p className="text-xl mb-8 opacity-90">Join 2M+ students who found their perfect match</p>
          <Link href="/colleges">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Simple Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { number: "3K+", label: "Colleges", icon: "🏫" },
              { number: "6K+", label: "Courses", icon: "📚" },
              { number: "50K+", label: "Students", icon: "👨‍🎓" },
              { number: "95%", label: "Success Rate", icon: "🎯" },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
