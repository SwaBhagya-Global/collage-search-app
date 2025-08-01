import Link from "next/link"
import { ChevronRight, TrendingUp, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import SearchSection from "@/components/search-section"
import CollegeCard from "@/components/college-card"

export default function HomePage() {
  const featuredColleges = [
    {
      id: 1,
      name: "Indian Institute of Technology Delhi",
      shortName: "IIT Delhi",
      location: "New Delhi",
      rating: 4.8,
      reviews: 2847,
      fees: "₹2.18L",
      courses: "MBA, PGDM",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240&q=80",
      featured: false,
      established: 1961,
      type: "Government",
      ranking: 1,
      avgPackage: "₹18.5L",
      highlights: ["NIRF Ranking 2", "100% Placement", "Top Faculty"],
      cutoff: "JEE Advanced: 63-89",
    },
    {
      id: 2,
      name: "All India Institute of Medical Sciences",
      shortName: "AIIMS Delhi",
      location: "New Delhi",
      rating: 4.9,
      reviews: 1923,
      fees: "₹5,500",
      courses: "MBA, PGDM",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240&q=80",
      featured: false,
      established: 1956,
      type: "Government",
      ranking: 2,
      avgPackage: "₹12L",
      highlights: ["NIRF Ranking 1", "Best Medical College", "Research Excellence"],
      cutoff: "NEET: 720+",
    },
  ]

  const topColleges = [
    {
      id: 9,
      name: "National Institute of Technology Trichy",
      shortName: "NIT Trichy",
      location: "Trichy",
      rating: 4.7,
      reviews: 1650,
      fees: "₹5.5L",
      courses: "B.Tech, M.Tech",
      image:
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240&q=80",
      established: 1964,
      type: "Government",
      ranking: 9,
      avgPackage: "₹14L",
      highlights: ["Top NIT", "Strong Alumni", "Research Focus"],
      cutoff: "JEE Main: 98+ %ile",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SearchSection />

      {/* Featured Colleges - More Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center">
                  Trending Colleges
                <TrendingUp className="w-6 h-6 ml-2 text-orange-500" />
              </h2>
              <p className="text-gray-600">Most popular colleges this month</p>
            </div>
            <Link href="/colleges" className="flex items-center text-blue-600 hover:text-blue-700 font-semibold">
              See All
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Colleges */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
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
            {topColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Dream College? 🎯</h2>
          <p className="text-xl mb-8 opacity-90">Join 2M+ students who found their perfect match</p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
            Start Your Journey
          </Button>
        </div>
      </section>

      {/* Simple Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { number: "40K+", label: "Colleges", icon: "🏫" },
              { number: "8K+", label: "Courses", icon: "📚" },
              { number: "2M+", label: "Students", icon: "👨‍🎓" },
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

      {/* Minimal Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-bold">EduFinder</span>
          </div>
          <p className="text-gray-400 mb-6">Your journey to the perfect college starts here</p>
          <div className="flex justify-center space-x-8 text-sm">
            <Link href="#" className="hover:text-blue-400 transition-colors">
              About
            </Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">
              Contact
            </Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">
              Terms
            </Link>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800 text-gray-500 text-sm">
            © 2024 EduFinder. Made with ❤️ for students
          </div>
        </div>
      </footer>
    </div>
  )
}
