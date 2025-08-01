import { MessageCircle, ThumbsUp, Eye, Search, Plus, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Header from "@/components/header"

export default function QAPage() {
  const featuredQuestions = [
    {
      id: 1,
      title: "What is the cutoff for Computer Science at IIT Delhi through JEE Advanced 2024?",
      content:
        "I'm preparing for JEE Advanced 2024 and want to know the expected cutoff for Computer Science Engineering at IIT Delhi. What was the cutoff in previous years and how much should I aim for?",
      category: "Admissions",
      author: {
        name: "Arjun Kumar",
        avatar: "/placeholder.svg?height=40&width=40&text=AK",
        reputation: 245,
      },
      answers: 12,
      views: 1547,
      upvotes: 89,
      tags: ["IIT Delhi", "JEE Advanced", "Computer Science", "Cutoff"],
      timeAgo: "2 hours ago",
      featured: true,
      solved: true,
    },
    {
      id: 2,
      title: "NEET 2024 preparation strategy for scoring 650+ marks",
      content:
        "I'm a 12th standard student preparing for NEET 2024. I want to score above 650 marks to get into a good government medical college. Can someone share an effective preparation strategy and time management tips?",
      category: "Exam Preparation",
      author: {
        name: "Priya Sharma",
        avatar: "/placeholder.svg?height=40&width=40&text=PS",
        reputation: 156,
      },
      answers: 18,
      views: 2341,
      upvotes: 134,
      tags: ["NEET", "Medical", "Preparation", "Strategy"],
      timeAgo: "5 hours ago",
      featured: true,
      solved: false,
    },
  ]

  const allQuestions = [
    {
      id: 3,
      title: "Is it worth taking a drop year for JEE preparation?",
      content:
        "I scored 89 percentile in JEE Main 2024 but didn't qualify for Advanced. Should I take a drop year or join a private college?",
      category: "Career Guidance",
      author: {
        name: "Rohit Patel",
        avatar: "/placeholder.svg?height=40&width=40&text=RP",
        reputation: 78,
      },
      answers: 8,
      views: 892,
      upvotes: 45,
      tags: ["JEE", "Drop Year", "Career"],
      timeAgo: "1 day ago",
      solved: false,
    },
    {
      id: 4,
      title: "Best books for CAT 2024 preparation?",
      content:
        "I'm starting my CAT preparation and confused about which books to follow. Can someone suggest the best books for each section?",
      category: "Study Material",
      author: {
        name: "Sneha Gupta",
        avatar: "/placeholder.svg?height=40&width=40&text=SG",
        reputation: 123,
      },
      answers: 15,
      views: 1234,
      upvotes: 67,
      tags: ["CAT", "Books", "MBA", "Preparation"],
      timeAgo: "2 days ago",
      solved: true,
    },
    {
      id: 5,
      title: "Hostel facilities at NIT Trichy - Need honest review",
      content:
        "I got admission in NIT Trichy and want to know about hostel facilities, food quality, and overall campus life. Any current students here?",
      category: "College Life",
      author: {
        name: "Karthik Raj",
        avatar: "/placeholder.svg?height=40&width=40&text=KR",
        reputation: 92,
      },
      answers: 6,
      views: 567,
      upvotes: 23,
      tags: ["NIT Trichy", "Hostel", "Campus Life"],
      timeAgo: "3 days ago",
      solved: false,
    },
    {
      id: 6,
      title: "Scope of Biotechnology in India - Career prospects?",
      content:
        "I'm interested in Biotechnology but worried about job opportunities in India. What are the career prospects and salary expectations?",
      category: "Career Guidance",
      author: {
        name: "Meera Joshi",
        avatar: "/placeholder.svg?height=40&width=40&text=MJ",
        reputation: 167,
      },
      answers: 11,
      views: 1089,
      upvotes: 56,
      tags: ["Biotechnology", "Career", "Jobs", "Salary"],
      timeAgo: "4 days ago",
      solved: true,
    },
  ]

  const categories = [
    { name: "Admissions", count: 1245, icon: "🎓" },
    { name: "Exam Preparation", count: 987, icon: "📚" },
    { name: "Career Guidance", count: 756, icon: "🎯" },
    { name: "College Life", count: 543, icon: "🏫" },
    { name: "Study Material", count: 432, icon: "📖" },
    { name: "Scholarships", count: 321, icon: "💰" },
  ]

  const topContributors = [
    { name: "Dr. Rajesh Kumar", reputation: 2456, answers: 234, avatar: "/placeholder.svg?height=40&width=40&text=RK" },
    { name: "Priya Educator", reputation: 1987, answers: 189, avatar: "/placeholder.svg?height=40&width=40&text=PE" },
    { name: "Vikram Mentor", reputation: 1654, answers: 156, avatar: "/placeholder.svg?height=40&width=40&text=VM" },
    { name: "Anita Guide", reputation: 1432, answers: 134, avatar: "/placeholder.svg?height=40&width=40&text=AG" },
    { name: "Suresh Expert", reputation: 1298, answers: 123, avatar: "/placeholder.svg?height=40&width=40&text=SE" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Questions & Answers</h1>
            <p className="text-xl mb-8 opacity-90">
              Get answers to your education queries from experts and fellow students
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <Input
                placeholder="Search questions or ask something..."
                className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 h-12 px-8">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
            <div className="mt-6">
              <Button className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Plus className="w-4 h-4 mr-2" />
                Ask a Question
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Featured Questions */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8">Featured Questions</h2>
              <div className="space-y-6">
                {featuredQuestions.map((question) => (
                  <Card key={question.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className="bg-orange-500">Featured</Badge>
                            <Badge variant="outline">{question.category}</Badge>
                            {question.solved && <Badge className="bg-green-500">Solved</Badge>}
                          </div>
                          <h3 className="text-xl font-bold mb-3 hover:text-blue-600 cursor-pointer">
                            {question.title}
                          </h3>
                          <p className="text-gray-700 mb-4 line-clamp-2">{question.content}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {question.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={question.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {question.author.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{question.author.name}</div>
                            <div className="text-xs text-gray-600">{question.author.reputation} reputation</div>
                          </div>
                          <span className="text-sm text-gray-500">{question.timeAgo}</span>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{question.upvotes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{question.answers}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{question.views}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* All Questions */}
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">All Questions</h2>
                <div className="flex gap-4">
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="admissions">Admissions</SelectItem>
                      <SelectItem value="preparation">Exam Preparation</SelectItem>
                      <SelectItem value="career">Career Guidance</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="unanswered">Unanswered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                {allQuestions.map((question) => (
                  <Card key={question.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline">{question.category}</Badge>
                            {question.solved && <Badge className="bg-green-500">Solved</Badge>}
                          </div>
                          <h3 className="text-lg font-bold mb-2 hover:text-blue-600 cursor-pointer">
                            {question.title}
                          </h3>
                          <p className="text-gray-700 mb-3 line-clamp-1">{question.content}</p>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {question.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={question.author.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">
                                  {question.author.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{question.author.name}</span>
                              <span className="text-sm text-gray-500">{question.timeAgo}</span>
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <ThumbsUp className="w-3 h-3" />
                                <span>{question.upvotes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="w-3 h-3" />
                                <span>{question.answers}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="w-3 h-3" />
                                <span>{question.views}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Questions
                </Button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* Ask Question CTA */}
            <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-lg mb-2">Have a Question?</h3>
                <p className="text-sm mb-4 opacity-90">Get answers from experts and fellow students</p>
                <Button className="bg-white text-purple-600 hover:bg-gray-100">
                  <Plus className="w-4 h-4 mr-2" />
                  Ask Question
                </Button>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Browse Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{category.icon}</span>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={contributor.name} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={contributor.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {contributor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{contributor.name}</div>
                        <div className="text-xs text-gray-600">
                          {contributor.reputation} reputation • {contributor.answers} answers
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Questions</span>
                    <span className="font-bold">15,432</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Answered</span>
                    <span className="font-bold text-green-600">12,876</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Users</span>
                    <span className="font-bold">8,945</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Expert Contributors</span>
                    <span className="font-bold text-blue-600">234</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
