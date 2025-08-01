import Image from "next/image"
import { Calendar, Users, BookOpen, Clock, ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"

export default function ExamsPage() {
  const featuredExams = [
    {
      id: 1,
      name: "JEE Main 2024",
      fullName: "Joint Entrance Examination Main",
      category: "Engineering",
      conductedBy: "National Testing Agency (NTA)",
      examDate: "April 6-15, 2024",
      applicationDeadline: "March 15, 2024",
      eligibility: "12th Pass with PCM",
      examMode: "Computer Based Test",
      duration: "3 hours",
      totalSeats: "1,50,000+",
      participatingColleges: "1000+",
      applicationFee: "₹1000",
      image: "/placeholder.svg?height=200&width=300&text=JEE+Main",
      featured: true,
      status: "Registration Open",
    },
    {
      id: 2,
      name: "NEET UG 2024",
      fullName: "National Eligibility cum Entrance Test",
      category: "Medical",
      conductedBy: "National Testing Agency (NTA)",
      examDate: "May 5, 2024",
      applicationDeadline: "April 10, 2024",
      eligibility: "12th Pass with PCB",
      examMode: "Pen & Paper",
      duration: "3 hours 20 minutes",
      totalSeats: "1,08,000+",
      participatingColleges: "600+",
      applicationFee: "₹1700",
      image: "/placeholder.svg?height=200&width=300&text=NEET+UG",
      featured: true,
      status: "Registration Open",
    },
    {
      id: 3,
      name: "CAT 2024",
      fullName: "Common Admission Test",
      category: "Management",
      conductedBy: "Indian Institutes of Management",
      examDate: "November 24, 2024",
      applicationDeadline: "September 20, 2024",
      eligibility: "Bachelor's Degree",
      examMode: "Computer Based Test",
      duration: "2 hours",
      totalSeats: "5,000+",
      participatingColleges: "20 IIMs + 1000+",
      applicationFee: "₹2300",
      image: "/placeholder.svg?height=200&width=300&text=CAT+2024",
      featured: true,
      status: "Notification Soon",
    },
  ]

  const allExams = [
    {
      id: 4,
      name: "GATE 2024",
      fullName: "Graduate Aptitude Test in Engineering",
      category: "Engineering",
      examDate: "February 3-11, 2024",
      applicationDeadline: "October 12, 2023",
      status: "Completed",
      image: "/placeholder.svg?height=150&width=200&text=GATE",
    },
    {
      id: 5,
      name: "CLAT 2024",
      fullName: "Common Law Admission Test",
      category: "Law",
      examDate: "December 1, 2024",
      applicationDeadline: "October 15, 2024",
      status: "Notification Soon",
      image: "/placeholder.svg?height=150&width=200&text=CLAT",
    },
    {
      id: 6,
      name: "NIFT 2024",
      fullName: "National Institute of Fashion Technology",
      category: "Design",
      examDate: "February 11, 2024",
      applicationDeadline: "January 2, 2024",
      status: "Registration Closed",
      image: "/placeholder.svg?height=150&width=200&text=NIFT",
    },
    {
      id: 7,
      name: "AIIMS 2024",
      fullName: "All India Institute of Medical Sciences",
      category: "Medical",
      examDate: "May 26, 2024",
      applicationDeadline: "April 30, 2024",
      status: "Registration Soon",
      image: "/placeholder.svg?height=150&width=200&text=AIIMS",
    },
    {
      id: 8,
      name: "XAT 2024",
      fullName: "Xavier Aptitude Test",
      category: "Management",
      examDate: "January 7, 2024",
      applicationDeadline: "November 30, 2023",
      status: "Completed",
      image: "/placeholder.svg?height=150&width=200&text=XAT",
    },
    {
      id: 9,
      name: "BITSAT 2024",
      fullName: "Birla Institute of Technology and Science Admission Test",
      category: "Engineering",
      examDate: "May 20-25, 2024",
      applicationDeadline: "March 31, 2024",
      status: "Registration Open",
      image: "/placeholder.svg?height=150&width=200&text=BITSAT",
    },
  ]

  const examCategories = [
    { name: "Engineering", count: 45, icon: "⚙️", color: "bg-blue-100 text-blue-700" },
    { name: "Medical", count: 25, icon: "🏥", color: "bg-red-100 text-red-700" },
    { name: "Management", count: 30, icon: "💼", color: "bg-green-100 text-green-700" },
    { name: "Law", count: 15, icon: "⚖️", color: "bg-purple-100 text-purple-700" },
    { name: "Design", count: 12, icon: "🎨", color: "bg-pink-100 text-pink-700" },
    { name: "Arts", count: 20, icon: "📚", color: "bg-yellow-100 text-yellow-700" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Registration Open":
        return "bg-green-500"
      case "Registration Soon":
        return "bg-blue-500"
      case "Registration Closed":
        return "bg-red-500"
      case "Notification Soon":
        return "bg-orange-500"
      case "Completed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Entrance Exams 2024</h1>
            <p className="text-xl mb-8 opacity-90">
              Complete guide to entrance exams across India - Dates, Eligibility, Application Process & More
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <Input
                placeholder="Search exams by name or category..."
                className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Select>
                <SelectTrigger className="w-full sm:w-48 h-12 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                  <SelectItem value="law">Law</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-orange-500 hover:bg-orange-600 h-12 px-8">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Exam Categories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {examCategories.map((category) => (
              <Card key={category.name} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div
                    className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center text-2xl mx-auto mb-3`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count} exams</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Exams */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Featured Exams 2024</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredExams.map((exam) => (
              <Card key={exam.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <Image
                    src={exam.image || "/placeholder.svg"}
                    alt={exam.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className={`absolute top-4 right-4 ${getStatusColor(exam.status)}`}>{exam.status}</Badge>
                  <Badge className="absolute top-4 left-4 bg-white text-gray-800">{exam.category}</Badge>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{exam.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{exam.fullName}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="font-medium">Exam Date:</span>
                      <span className="ml-2">{exam.examDate}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="font-medium">Application Deadline:</span>
                      <span className="ml-2 text-red-600">{exam.applicationDeadline}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="font-medium">Total Seats:</span>
                      <span className="ml-2">{exam.totalSeats}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BookOpen className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="font-medium">Eligibility:</span>
                      <span className="ml-2">{exam.eligibility}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="font-bold text-blue-600">{exam.duration}</div>
                      <div className="text-xs text-gray-600">Duration</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="font-bold text-green-600">{exam.applicationFee}</div>
                      <div className="text-xs text-gray-600">Application Fee</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">View Details</Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Exams */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">All Entrance Exams</h2>
            <div className="flex gap-4">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Registration Open</SelectItem>
                  <SelectItem value="soon">Registration Soon</SelectItem>
                  <SelectItem value="closed">Registration Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming First</SelectItem>
                  <SelectItem value="deadline">Deadline First</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allExams.map((exam) => (
              <Card key={exam.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={exam.image || "/placeholder.svg"}
                    alt={exam.name}
                    width={200}
                    height={150}
                    className="w-full h-40 object-cover"
                  />
                  <Badge className={`absolute top-3 right-3 ${getStatusColor(exam.status)}`}>{exam.status}</Badge>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">{exam.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-1">{exam.fullName}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Category:</span>
                      <Badge variant="outline">{exam.category}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Exam Date:</span>
                      <span className="font-medium">{exam.examDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Deadline:</span>
                      <span className="font-medium text-red-600">{exam.applicationDeadline}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Exams
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
