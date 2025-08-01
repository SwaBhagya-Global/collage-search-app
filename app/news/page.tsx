import Image from "next/image"
import { Calendar, User, Eye, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"

export default function NewsPage() {
  const featuredNews = {
    id: 1,
    title: "JEE Main 2024: Registration Process Extended Till March 15",
    excerpt:
      "National Testing Agency (NTA) has extended the registration deadline for JEE Main 2024 following requests from students and parents across the country.",
    content:
      "The National Testing Agency has announced an extension of the JEE Main 2024 registration deadline to March 15, 2024. This decision comes after numerous requests from students and educational institutions citing various logistical challenges...",
    category: "Entrance Exams",
    author: "Priya Sharma",
    date: "March 8, 2024",
    readTime: "5 min read",
    views: 15420,
    image: "/placeholder.svg?height=400&width=800&text=JEE+Main+2024+News",
    featured: true,
  }

  const newsArticles = [
    {
      id: 2,
      title: "NEET UG 2024: Medical Counselling Schedule Released",
      excerpt:
        "Medical Counselling Committee releases detailed schedule for NEET UG 2024 counselling process with important dates.",
      category: "Medical",
      author: "Dr. Rajesh Kumar",
      date: "March 7, 2024",
      readTime: "3 min read",
      views: 12350,
      image: "/placeholder.svg?height=200&width=300&text=NEET+2024",
    },
    {
      id: 3,
      title: "New Education Policy 2020: Implementation Updates Across Universities",
      excerpt:
        "Latest updates on NEP 2020 implementation across Indian universities and its impact on higher education structure.",
      category: "Policy",
      author: "Anita Desai",
      date: "March 6, 2024",
      readTime: "7 min read",
      views: 8900,
      image: "/placeholder.svg?height=200&width=300&text=NEP+2020",
    },
    {
      id: 4,
      title: "CAT 2024: Registration to Begin from August 1st",
      excerpt: "Indian Institutes of Management announce CAT 2024 registration dates and exam pattern changes.",
      category: "Management",
      author: "Vikram Singh",
      date: "March 5, 2024",
      readTime: "4 min read",
      views: 11200,
      image: "/placeholder.svg?height=200&width=300&text=CAT+2024",
    },
    {
      id: 5,
      title: "GATE 2024 Results: Record Number of Qualifiers This Year",
      excerpt:
        "GATE 2024 results show highest qualification rate in recent years with significant improvements in success rates.",
      category: "Engineering",
      author: "Suresh Patel",
      date: "March 4, 2024",
      readTime: "6 min read",
      views: 9800,
      image: "/placeholder.svg?height=200&width=300&text=GATE+2024",
    },
    {
      id: 6,
      title: "Digital University Initiative: 12 New Digital Universities Approved",
      excerpt:
        "Government approves establishment of 12 new digital universities to enhance online education accessibility.",
      category: "Technology",
      author: "Meera Joshi",
      date: "March 3, 2024",
      readTime: "5 min read",
      views: 7650,
      image: "/placeholder.svg?height=200&width=300&text=Digital+University",
    },
    {
      id: 7,
      title: "Scholarship Alert: PM Scholarship Scheme 2024 Applications Open",
      excerpt:
        "Prime Minister's Scholarship Scheme for 2024 now accepting applications with increased scholarship amounts.",
      category: "Scholarships",
      author: "Ravi Gupta",
      date: "March 2, 2024",
      readTime: "4 min read",
      views: 13400,
      image: "/placeholder.svg?height=200&width=300&text=PM+Scholarship",
    },
    {
      id: 8,
      title: "International Student Exchange: New Partnerships with 50 Global Universities",
      excerpt:
        "Indian universities sign MoUs with 50 international institutions to facilitate student exchange programs.",
      category: "International",
      author: "Kavita Nair",
      date: "March 1, 2024",
      readTime: "6 min read",
      views: 6200,
      image: "/placeholder.svg?height=200&width=300&text=Student+Exchange",
    },
    {
      id: 9,
      title: "Research Funding: ₹5000 Crore Allocated for Higher Education Research",
      excerpt: "Government announces massive research funding boost for Indian universities and research institutions.",
      category: "Research",
      author: "Prof. Amit Sharma",
      date: "February 28, 2024",
      readTime: "8 min read",
      views: 5800,
      image: "/placeholder.svg?height=200&width=300&text=Research+Funding",
    },
  ]

  const categories = [
    { name: "All", count: 150 },
    { name: "Entrance Exams", count: 45 },
    { name: "Medical", count: 32 },
    { name: "Engineering", count: 28 },
    { name: "Management", count: 22 },
    { name: "Policy", count: 18 },
    { name: "Scholarships", count: 15 },
    { name: "Technology", count: 12 },
    { name: "International", count: 8 },
    { name: "Research", count: 6 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Education News & Updates</h1>
            <p className="text-xl mb-8 opacity-90">
              Stay updated with the latest news, exam notifications, and policy changes in Indian education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <Input
                placeholder="Search news articles..."
                className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 h-12 px-8">Search News</Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Featured Article */}
            <Card className="mb-8 overflow-hidden">
              <div className="relative">
                <Image
                  src={featuredNews.image || "/placeholder.svg"}
                  alt={featuredNews.title}
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-red-500">Featured</Badge>
                <Badge className="absolute top-4 right-4 bg-blue-600">{featuredNews.category}</Badge>
              </div>
              <CardContent className="p-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 hover:text-blue-600 cursor-pointer">
                  {featuredNews.title}
                </h2>
                <p className="text-gray-600 mb-4 text-lg leading-relaxed">{featuredNews.excerpt}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {featuredNews.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {featuredNews.date}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {featuredNews.views.toLocaleString()} views
                  </div>
                  <span>{featuredNews.readTime}</span>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Read Full Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* News Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {newsArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2">
                      {article.category}
                    </Badge>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span>{article.author}</span>
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-3 h-3" />
                        <span>{article.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* Categories */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex justify-between items-center py-2 hover:bg-gray-50 px-2 rounded cursor-pointer"
                    >
                      <span className="text-gray-700">{category.name}</span>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending News */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Trending News</h3>
                <div className="space-y-4">
                  {newsArticles.slice(0, 5).map((article, index) => (
                    <div key={article.id} className="flex space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-2 hover:text-blue-600 cursor-pointer">
                          {article.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Eye className="w-3 h-3 mr-1" />
                          {article.views.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
                <p className="text-sm mb-4 opacity-90">Get the latest education news delivered to your inbox</p>
                <div className="space-y-3">
                  <Input
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                  />
                  <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">Subscribe Now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
