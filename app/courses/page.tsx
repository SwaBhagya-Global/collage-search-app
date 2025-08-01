import { Search, Filter, BookOpen, Clock, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      name: "Bachelor of Technology (B.Tech) in Computer Science",
      duration: "4 Years",
      level: "Undergraduate",
      colleges: 1250,
      avgFees: "₹3.5L/year",
      avgSalary: "₹8.5L/year",
      category: "Engineering",
      description: "Comprehensive program covering programming, algorithms, data structures, and software development.",
      skills: ["Programming", "Data Structures", "Software Development", "AI/ML"],
      trending: true,
    },
    {
      id: 2,
      name: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
      duration: "5.5 Years",
      level: "Undergraduate",
      colleges: 450,
      avgFees: "₹8.2L/year",
      avgSalary: "₹12L/year",
      category: "Medical",
      description: "Medical degree program to become a licensed doctor with clinical training.",
      skills: ["Medical Knowledge", "Patient Care", "Diagnosis", "Surgery"],
      trending: true,
    },
    {
      id: 3,
      name: "Master of Business Administration (MBA)",
      duration: "2 Years",
      level: "Postgraduate",
      colleges: 800,
      avgFees: "₹12L/year",
      avgSalary: "₹15L/year",
      category: "Management",
      description: "Advanced business management program covering strategy, finance, marketing, and operations.",
      skills: ["Leadership", "Strategy", "Finance", "Marketing"],
      trending: true,
    },
    {
      id: 4,
      name: "Bachelor of Commerce (B.Com)",
      duration: "3 Years",
      level: "Undergraduate",
      colleges: 2000,
      avgFees: "₹1.2L/year",
      avgSalary: "₹4.5L/year",
      category: "Commerce",
      description: "Comprehensive commerce education covering accounting, finance, and business studies.",
      skills: ["Accounting", "Finance", "Business Studies", "Economics"],
      trending: false,
    },
    {
      id: 5,
      name: "Bachelor of Science (B.Sc) in Data Science",
      duration: "3 Years",
      level: "Undergraduate",
      colleges: 350,
      avgFees: "₹2.8L/year",
      avgSalary: "₹7L/year",
      category: "Science",
      description: "Emerging field combining statistics, programming, and domain expertise for data analysis.",
      skills: ["Python", "Statistics", "Machine Learning", "Data Visualization"],
      trending: true,
    },
    {
      id: 6,
      name: "Bachelor of Arts (B.A) in Psychology",
      duration: "3 Years",
      level: "Undergraduate",
      colleges: 650,
      avgFees: "₹80K/year",
      avgSalary: "₹3.5L/year",
      category: "Arts",
      description: "Study of human behavior, mental processes, and psychological principles.",
      skills: ["Research", "Counseling", "Analysis", "Communication"],
      trending: false,
    },
  ]

  const categories = [
    { name: "Engineering", count: 2500, icon: "⚙️" },
    { name: "Medical", count: 1200, icon: "🏥" },
    { name: "Management", count: 1800, icon: "💼" },
    { name: "Arts", count: 900, icon: "🎨" },
    { name: "Science", count: 1500, icon: "🔬" },
    { name: "Commerce", count: 1100, icon: "💰" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-4">Explore Courses</h1>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input placeholder="Search courses by name, category, or skills..." className="pl-10 h-12" />
            </div>

            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="undergraduate">Undergraduate</SelectItem>
                  <SelectItem value="postgraduate">Postgraduate</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="h-12 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card key={category.name} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-600">{category.count} courses</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">Showing {courses.length} courses</p>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by Popularity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="salary">Highest Salary</SelectItem>
              <SelectItem value="fees-low">Fees: Low to High</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Course Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg line-clamp-2">{course.name}</CardTitle>
                      {course.trending && (
                        <Badge className="bg-orange-500 text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {course.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <BookOpen className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{course.colleges} colleges</span>
                  </div>
                  <div className="text-sm font-semibold text-green-600">Avg. Salary: {course.avgSalary}</div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">Key Skills:</div>
                  <div className="flex flex-wrap gap-1">
                    {course.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-blue-600">{course.avgFees}</div>
                  <div className="flex gap-2">
                    <Button size="sm">View Details</Button>
                    <Button size="sm" variant="outline">
                      Compare
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex gap-2">
            <Button variant="outline">Previous</Button>
            <Button variant="outline">1</Button>
            <Button>2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
