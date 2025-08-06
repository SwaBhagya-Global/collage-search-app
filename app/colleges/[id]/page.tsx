'use client';
import Image from "next/image"
import Link from "next/link"
import {
  Star, MapPin, Phone, Mail, Globe, Download, Heart, ChevronRight, CheckCircle, TwitterIcon, InstagramIcon, LinkedinIcon} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Separator } from "@/components/ui/separator"
import StarRating from "@/components/Star-Rating"

export default function CollegePage({ params }: { params: { id: string } }) {
  // Mock data for the college
  const college = {
    id: 1,
    name: "IZEE BUSINESS SCHOOL",
    shortName: "IIT Delhi",
    location: "Hauz Khas, New Delhi, Delhi",
    brochureLink: "https://izeeinstitutions.com/wp-content/uploads/2025/03/Fee-structure-edited-1.pdf",
    established: 1961,
    type: "Public/Government",
    affiliation: "Bangalore University, Bengaluru",
    adress: "PLOT 325-B,PART A,BOMMASANDRA-JIGANI LINK ROAD,JIGANI INDUSTRIAL AREA,JIGANI POST,ANEKAL TALUK,BENGALURU 560105",
    rating: 4.8,

    // ranking: {
    //   nirf: 2,
    //   india: 1,
    //   world: 185,
    // },
    intake: "240",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    contact: {
      phone: "+8050002929, 9606043002",
      email: "admin@izeeinstitutions.com",
      website: "https://izeeinstitutions.com",
    },
    highlights: [
      "NIRF Ranking 2 in Engineering",
      "100% Placement Record",
      "Top Faculty from IITs/IIMs",
      "State-of-the-art Infrastructure",
      "Research Excellence",
    ],
    courses: [
      {
        name: "MBA",
        duration: "4 Years",
        fees: "₹2.18 Lakhs",
        eligibility: "JEE Advanced",
        seats: 120,
      },
      {
        name: "PGDM",
        duration: "4 Years",
        fees: "₹2.18 Lakhs",
        eligibility: "JEE Advanced",
        seats: 100,
      },
      {
        name: "M.Tech Computer Science",
        duration: "2 Years",
        fees: "₹1.5 Lakhs",
        eligibility: "GATE",
        seats: 80,
      },
    ],
    placements: {
      averagePackage: "₹18.5 LPA",
      highestPackage: "₹7.25 CPA",
      placementRate: 95,
      topRecruiters: ["Google", "Microsoft", "Amazon", "Goldman Sachs", "McKinsey"],
    },
    facilities: [
      "Library",
      "Hostel",
      "Sports Complex",
      "Medical Center",
      "Cafeteria",
      "Wi-Fi Campus",
      "Laboratories",
      "Auditorium",
      "Gym",
      "Swimming Pool",
    ],
    admissionProcess: [
      "JEE Advanced Qualification",
      "Counselling Registration",
      "Choice Filling",
      "Seat Allotment",
      "Document Verification",
      "Fee Payment",
    ],
  }

  const reviews = [
    {
      id: 1,
      author: "Rahul Sharma",
      course: "B.Tech CSE",
      year: "2023",
      rating: 5,
      title: "Excellent Infrastructure and Faculty",
      content:
        "IIT Delhi provides world-class education with excellent faculty and infrastructure. The placement opportunities are outstanding.",
      likes: 45,
      helpful: true,
    },
    {
      id: 2,
      author: "Priya Patel",
      course: "M.Tech EE",
      year: "2022",
      rating: 4,
      title: "Great Research Opportunities",
      content:
        "The research facilities and opportunities at IIT Delhi are exceptional. Faculty is very supportive and knowledgeable.",
      likes: 32,
      helpful: true,
    },
  ]

  const handleRatingChange = (value: number) => {
    console.log('Rated:', value);
    // You can send this to your backend via fetch/axios here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/colleges" className="hover:text-blue-600">
              Colleges
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{college.name}</span>
          </div>
        </div>
      </div>

      {/* College Header */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* College Images */}
            <div className="lg:w-2/3">
              <div className="relative">
                <Image
                  src={college.images[0] || "/placeholder.svg"}
                  alt={college.name}
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover rounded-lg"
                />
                {/* <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button size="sm" variant="secondary" className="bg-white/90">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/90">
                    <Heart className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                </div> */}
              </div>
            </div>

            {/* College Info */}
            <div className="lg:w-1/3">
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{college.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{college.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-[11px]">{college.adress}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Est. {college.established}</span>
                    <span>•</span>
                    <span>{college.type}</span>
                    <span>•</span>
                    <span>{college.affiliation}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex flex-col items-start gap-4">
                  {/* ✅ Existing Average Rating Display */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-green-100 px-3 py-2 rounded-lg">
                      <Star className="w-5 h-5 fill-green-600 text-green-600 mr-2" />
                      <span className="font-bold text-green-700 text-lg">{college.rating}</span>
                    </div>
                    <span>Rate Us</span>
                    <StarRating initialRating={0} onRate={handleRatingChange} />
                  </div>
                </div>

                {/* Rankings */}
                {/* <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="font-bold text-blue-600 text-xl">#{college.intake}</div>
                    <div className="text-xs text-gray-600">NIRF Ranking</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="font-bold text-blue-600 text-xl">#{college.ranking.india}</div>
                    <div className="text-xs text-gray-600">India Ranking</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="font-bold text-blue-600 text-xl">#{college.ranking.world}</div>
                    <div className="text-xs text-gray-600">World Ranking</div>
                  </div>
                </div> */}

                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{college.contact.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{college.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link href="https://example.com" target="_blank" rel="noopener noreferrer">
                      <Globe className="w-5 h-5 text-gray-600 hover:text-blue-600 transition" />
                    </Link>
                    <Link href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">
                      <TwitterIcon className="w-5 h-5 text-gray-600 hover:text-sky-500 transition" />
                    </Link>
                    <Link href="https://instagram.com/example" target="_blank" rel="noopener noreferrer">
                      <InstagramIcon className="w-5 h-5 text-gray-600 hover:text-pink-500 transition" />
                    </Link>
                    <Link href="https://linkedin.com/in/example" target="_blank" rel="noopener noreferrer">
                      <LinkedinIcon className="w-5 h-5 text-gray-600 hover:text-blue-700 transition" />
                    </Link>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                    <Link href="/brochure.pdf" target="_blank">
                      <Download className="w-4 h-4 mr-2" />
                      Download Brochure
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="w-full border-blue-600 text-blue-600 bg-transparent">
                    <Link href="/apply">
                      Apply Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* College Highlights */}
      <div className="bg-white border-t">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-4">
            {college.highlights.map((highlight, index) => (
              <Badge key={index} variant="secondary" className="bg-green-100 text-green-700 px-3 py-1">
                <CheckCircle className="w-3 h-3 mr-1" />
                {highlight}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="admission">Admission</TabsTrigger>
                <TabsTrigger value="placements">Placements</TabsTrigger>
                <TabsTrigger value="facilities">Facilities</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {college.shortName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      Indian Institute of Technology Delhi is one of the premier engineering institutions in India.
                      Established in 1961, IIT Delhi has been a leader in engineering education and research. The
                      institute offers undergraduate, postgraduate, and doctoral programs in various fields of
                      engineering, science, and technology. With world-class faculty, state-of-the-art infrastructure,
                      and excellent placement records, IIT Delhi continues to be the dream destination for engineering
                      aspirants.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">15,000+</div>
                        <div className="text-sm text-gray-600">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">500+</div>
                        <div className="text-sm text-gray-600">Faculty</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">50+</div>
                        <div className="text-sm text-gray-600">Departments</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">1000+</div>
                        <div className="text-sm text-gray-600">Acres Campus</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="courses" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Courses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {college.courses.map((course, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{course.name}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                <span>Duration: {course.duration}</span>
                                <span>•</span>
                                <span>Seats: {course.seats}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-blue-600">{course.fees}</div>
                              <div className="text-sm text-gray-600">Total Fee</div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline">{course.eligibility}</Badge>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="admission" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Admission Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {college.admissionProcess.map((step, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{step}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Important Dates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span>JEE Advanced 2024</span>
                        <span className="font-semibold">May 26, 2024</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span>Result Declaration</span>
                        <span className="font-semibold">June 9, 2024</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span>Counselling Starts</span>
                        <span className="font-semibold">June 20, 2024</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="placements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Placement Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{college.placements.averagePackage}</div>
                        <div className="text-sm text-gray-600">Average Package</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{college.placements.highestPackage}</div>
                        <div className="text-sm text-gray-600">Highest Package</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{college.placements.placementRate}%</div>
                        <div className="text-sm text-gray-600">Placement Rate</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Top Recruiters</h4>
                      <div className="flex flex-wrap gap-2">
                        {college.placements.topRecruiters.map((recruiter, index) => (
                          <Badge key={index} variant="outline" className="px-3 py-1">
                            {recruiter}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="facilities" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Campus Facilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {college.facilities.map((facility, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm">{facility}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-b-0">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="font-semibold">{review.author}</div>
                              <div className="text-sm text-gray-600">
                                {review.course} • {review.year}
                              </div>
                            </div>
                            <div className="flex items-center bg-green-100 px-2 py-1 rounded">
                              <Star className="w-4 h-4 fill-green-600 text-green-600 mr-1" />
                              <span className="font-semibold text-green-700">{review.rating}</span>
                            </div>
                          </div>
                          <h4 className="font-medium mb-2">{review.title}</h4>
                          <p className="text-gray-700 mb-3">{review.content}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <button className="flex items-center gap-1 hover:text-blue-600">
                              <Heart className="w-4 h-4" />
                              {review.likes} Helpful
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* Quick Apply */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Apply</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Apply Now</Button>
                <Button variant="outline" className="w-full border-blue-600 text-blue-600 bg-transparent">
                  Download Brochure
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Get Expert Guidance
                </Button>
              </CardContent>
            </Card>

            {/* Similar Colleges */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="text-lg">Similar Colleges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "IIT Bombay", rating: 4.9, location: "Mumbai" },
                  { name: "IIT Madras", rating: 4.8, location: "Chennai" },
                  { name: "IIT Kanpur", rating: 4.7, location: "Kanpur" },
                ].map((college, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div>
                      <div className="font-medium">{college.name}</div>
                      <div className="text-sm text-gray-600">{college.location}</div>
                    </div>
                    <div className="flex items-center bg-green-100 px-2 py-1 rounded">
                      <Star className="w-3 h-3 fill-green-600 text-green-600 mr-1" />
                      <span className="text-sm font-semibold text-green-700">{college.rating}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card> */}

            {/* Latest News */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="text-lg">Latest Updates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium mb-1">JEE Advanced 2024 Registration Open</div>
                  <div className="text-gray-600 text-xs">2 hours ago</div>
                </div>
                <Separator />
                <div className="text-sm">
                  <div className="font-medium mb-1">New Research Center Inaugurated</div>
                  <div className="text-gray-600 text-xs">1 day ago</div>
                </div>
                <Separator />
                <div className="text-sm">
                  <div className="font-medium mb-1">Placement Drive 2024 Begins</div>
                  <div className="text-gray-600 text-xs">3 days ago</div>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  )
}
