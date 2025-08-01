import Image from "next/image"
import { Star, ThumbsUp, MessageCircle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Header from "@/components/header"

export default function ReviewsPage() {
  const featuredReviews = [
    {
      id: 1,
      collegeName: "Indian Institute of Technology Delhi",
      collegeImage: "/placeholder.svg?height=100&width=100&text=IIT+Delhi",
      rating: 4.8,
      reviewTitle: "Excellent Infrastructure and World-Class Faculty",
      reviewContent:
        "IIT Delhi has been an incredible journey for me. The faculty is extremely knowledgeable and supportive. The infrastructure is world-class with modern laboratories and research facilities. The placement opportunities are outstanding with top companies visiting the campus. The campus life is vibrant with numerous clubs and activities. Highly recommended for engineering aspirants.",
      reviewer: {
        name: "Rahul Sharma",
        avatar: "/placeholder.svg?height=40&width=40&text=RS",
        course: "B.Tech Computer Science",
        batch: "2020-2024",
        verified: true,
      },
      likes: 245,
      comments: 32,
      helpful: 189,
      date: "2 days ago",
      featured: true,
      aspects: {
        academics: 4.9,
        infrastructure: 4.8,
        faculty: 4.7,
        placements: 4.9,
        campusLife: 4.6,
      },
    },
    {
      id: 2,
      collegeName: "All India Institute of Medical Sciences",
      collegeImage: "/placeholder.svg?height=100&width=100&text=AIIMS",
      rating: 4.9,
      reviewTitle: "Best Medical Education in India",
      reviewContent:
        "AIIMS Delhi is undoubtedly the best medical college in India. The clinical exposure is unmatched, and you get to work with the best doctors in the country. The patient load is high, which gives excellent practical experience. The research opportunities are abundant. The only downside is the intense competition and pressure, but it's worth it for the quality of education.",
      reviewer: {
        name: "Dr. Priya Patel",
        avatar: "/placeholder.svg?height=40&width=40&text=PP",
        course: "MBBS",
        batch: "2018-2023",
        verified: true,
      },
      likes: 198,
      comments: 28,
      helpful: 156,
      date: "1 week ago",
      featured: true,
      aspects: {
        academics: 5.0,
        infrastructure: 4.7,
        faculty: 4.9,
        placements: 4.8,
        campusLife: 4.5,
      },
    },
  ]

  const allReviews = [
    {
      id: 3,
      collegeName: "Indian Institute of Management Ahmedabad",
      collegeImage: "/placeholder.svg?height=80&width=80&text=IIM-A",
      rating: 4.7,
      reviewTitle: "Transformative MBA Experience",
      reviewContent:
        "IIM Ahmedabad has completely transformed my perspective on business and management. The case study method is challenging but extremely effective. The peer learning is incredible with diverse backgrounds of students. The alumni network is the strongest asset of this institution.",
      reviewer: {
        name: "Vikram Singh",
        avatar: "/placeholder.svg?height=40&width=40&text=VS",
        course: "MBA",
        batch: "2022-2024",
        verified: true,
      },
      likes: 156,
      comments: 24,
      helpful: 134,
      date: "3 days ago",
    },
    {
      id: 4,
      collegeName: "Delhi University - St. Stephen's College",
      collegeImage: "/placeholder.svg?height=80&width=80&text=DU",
      rating: 4.6,
      reviewTitle: "Rich Heritage and Academic Excellence",
      reviewContent:
        "St. Stephen's College offers a perfect blend of academic rigor and extracurricular activities. The faculty is highly qualified and the college has a rich history. The campus is beautiful and the student community is diverse and intellectually stimulating.",
      reviewer: {
        name: "Ananya Gupta",
        avatar: "/placeholder.svg?height=40&width=40&text=AG",
        course: "B.A. Economics",
        batch: "2021-2024",
        verified: true,
      },
      likes: 89,
      comments: 15,
      helpful: 67,
      date: "5 days ago",
    },
    {
      id: 5,
      collegeName: "National Institute of Design",
      collegeImage: "/placeholder.svg?height=80&width=80&text=NID",
      rating: 4.5,
      reviewTitle: "Creative Freedom and Innovation",
      reviewContent:
        "NID Ahmedabad is a paradise for creative minds. The freedom to explore and experiment is unparalleled. The faculty comprises industry experts and the projects are real-world oriented. The campus culture encourages innovation and out-of-the-box thinking.",
      reviewer: {
        name: "Arjun Mehta",
        avatar: "/placeholder.svg?height=40&width=40&text=AM",
        course: "M.Des Product Design",
        batch: "2022-2024",
        verified: true,
      },
      likes: 72,
      comments: 12,
      helpful: 58,
      date: "1 week ago",
    },
    {
      id: 6,
      collegeName: "Jawaharlal Nehru University",
      collegeImage: "/placeholder.svg?height=80&width=80&text=JNU",
      rating: 4.4,
      reviewTitle: "Intellectual Hub with Diverse Perspectives",
      reviewContent:
        "JNU is known for its intellectual environment and diverse student body. The library is excellent and the research facilities are good. The campus is huge and green. The political atmosphere can be intense but it also teaches you to form and defend your opinions.",
      reviewer: {
        name: "Kavya Nair",
        avatar: "/placeholder.svg?height=40&width=40&text=KN",
        course: "M.A. International Relations",
        batch: "2021-2023",
        verified: true,
      },
      likes: 94,
      comments: 18,
      helpful: 76,
      date: "2 weeks ago",
    },
  ]

  const topColleges = [
    { name: "IIT Delhi", rating: 4.8, reviews: 2847 },
    { name: "AIIMS Delhi", rating: 4.9, reviews: 1923 },
    { name: "IIM Ahmedabad", rating: 4.7, reviews: 1456 },
    { name: "IIT Bombay", rating: 4.9, reviews: 3200 },
    { name: "IIT Madras", rating: 4.8, reviews: 2890 },
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">College Reviews & Ratings</h1>
            <p className="text-xl mb-8 opacity-90">
              Read authentic reviews from students and alumni to make informed decisions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <Input
                placeholder="Search college reviews..."
                className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 h-12 px-8">Search Reviews</Button>
            </div>
            <div className="mt-6">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Write a Review
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Featured Reviews */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8">Featured Reviews</h2>
              <div className="space-y-8">
                {featuredReviews.map((review) => (
                  <Card key={review.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      {/* College Header */}
                      <div className="flex items-center space-x-4 mb-6">
                        <Image
                          src={review.collegeImage || "/placeholder.svg"}
                          alt={review.collegeName}
                          width={60}
                          height={60}
                          className="rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{review.collegeName}</h3>
                          <div className="flex items-center space-x-2">
                            <div className="flex">{renderStars(review.rating)}</div>
                            <span className="font-semibold">{review.rating}</span>
                            <Badge className="bg-green-500">Featured</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Review Content */}
                      <div className="mb-6">
                        <h4 className="font-bold text-xl mb-3">{review.reviewTitle}</h4>
                        <p className="text-gray-700 leading-relaxed">{review.reviewContent}</p>
                      </div>

                      {/* Aspect Ratings */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                        <div className="text-center">
                          <div className="font-semibold text-blue-600">{review.aspects.academics}</div>
                          <div className="text-xs text-gray-600">Academics</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-blue-600">{review.aspects.infrastructure}</div>
                          <div className="text-xs text-gray-600">Infrastructure</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-blue-600">{review.aspects.faculty}</div>
                          <div className="text-xs text-gray-600">Faculty</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-blue-600">{review.aspects.placements}</div>
                          <div className="text-xs text-gray-600">Placements</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-blue-600">{review.aspects.campusLife}</div>
                          <div className="text-xs text-gray-600">Campus Life</div>
                        </div>
                      </div>

                      {/* Reviewer Info */}
                      <div className="flex items-center justify-between border-t pt-4">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={review.reviewer.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {review.reviewer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{review.reviewer.name}</span>
                              {review.reviewer.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-600">
                              {review.reviewer.course} • {review.reviewer.batch}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">{review.date}</div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="flex items-center space-x-6">
                          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{review.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                            <MessageCircle className="w-4 h-4" />
                            <span>{review.comments}</span>
                          </button>
                          <span className="text-sm text-gray-600">{review.helpful} found helpful</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Read Full Review
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* All Reviews */}
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">All Reviews</h2>
                <div className="flex gap-4">
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="helpful">Most Helpful</SelectItem>
                      <SelectItem value="rating">Highest Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-6">
                {allReviews.map((review) => (
                  <Card key={review.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Image
                          src={review.collegeImage || "/placeholder.svg"}
                          alt={review.collegeName}
                          width={50}
                          height={50}
                          className="rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-bold text-lg">{review.collegeName}</h3>
                              <div className="flex items-center space-x-2">
                                <div className="flex">{renderStars(review.rating)}</div>
                                <span className="font-semibold">{review.rating}</span>
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>

                          <h4 className="font-semibold mb-2">{review.reviewTitle}</h4>
                          <p className="text-gray-700 mb-4 line-clamp-3">{review.reviewContent}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={review.reviewer.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">
                                  {review.reviewer.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-sm">{review.reviewer.name}</span>
                                  {review.reviewer.verified && (
                                    <Badge variant="secondary" className="text-xs">
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-xs text-gray-600">
                                  {review.reviewer.course} • {review.reviewer.batch}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                                <ThumbsUp className="w-3 h-3" />
                                <span className="text-sm">{review.likes}</span>
                              </button>
                              <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                                <MessageCircle className="w-3 h-3" />
                                <span className="text-sm">{review.comments}</span>
                              </button>
                              <Button variant="outline" size="sm">
                                Read More
                              </Button>
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
                  Load More Reviews
                </Button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* Write Review CTA */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-lg mb-2">Share Your Experience</h3>
                <p className="text-sm mb-4 opacity-90">Help other students by writing a review of your college</p>
                <Button className="bg-white text-blue-600 hover:bg-gray-100">Write a Review</Button>
              </CardContent>
            </Card>

            {/* Top Rated Colleges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Top Rated Colleges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topColleges.map((college, index) => (
                    <div key={college.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{college.name}</div>
                          <div className="text-sm text-gray-600">{college.reviews} reviews</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{college.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Review Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Review Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Be honest and constructive in your feedback</li>
                  <li>• Focus on your personal experience</li>
                  <li>• Mention specific aspects like faculty, infrastructure</li>
                  <li>• Avoid using offensive language</li>
                  <li>• Include both pros and cons</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
