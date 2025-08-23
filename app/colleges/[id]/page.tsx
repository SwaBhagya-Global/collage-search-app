'use client';
import Image from "next/image"
import Link from "next/link"
import {
  Star, MapPin, Phone, Mail, Globe, Download, Heart, ChevronRight, CheckCircle, TwitterIcon, InstagramIcon, LinkedinIcon,
  Facebook
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Separator } from "@/components/ui/separator"
import StarRating from "@/components/Star-Rating"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface ApiCollege {
  _id: string
  name: string
  shortName: string
  location: string
  affiliation?: string
  address?: string
  rating: number
  intake?: string
  type?: string
  images: string[]
  brochureLink?: string
  highlights: string[]
  established: number
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
    facebook?: string
    instagram?: string
    linkedin?: string
    _id: string
  }
  averagePackage: string
  highestPackage: string
  topRecruiters: string[]
  mapUrl: string
  createdAt: string
  updatedAt: string
  contact?: {
    email?: string
    phone?: string
    _id: string
  }
}

export default function CollegePage({ params }: { params: { id: string } }) {
  const { id } = useParams();
  const [college, setCollege] = useState<ApiCollege | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchColleges() {
      try {
        const res = await fetch(`http://localhost:6002/api/colleges/${id}`); // 🔹 replace with your API endpoint
        // const data: ApiCollege[] = await res.json();
        const data = await res.json();

        setCollege(data.data);
      } catch (err) {
        console.error("Failed to fetch colleges", err);
      } finally {
        setLoading(false);
      }
    }

    fetchColleges();
  }, [id])

  console.log("collage", college);

  const handleRatingChange = (value: number) => {
    console.log('Rated:', value);
    // You can send this to your backend via fetch/axios here
  };
    const handleRatingSubmit = async (rating: number) => {
    try {
      const response = await fetch(`http://localhost:6002/api/colleges/${id}/rating`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating }),
      });

      if (!response.ok) throw new Error('Failed to update rating');

      const data = await response.json();
      console.log('Rating updated successfully:', data);
      // Optional: Update UI with new average rating
    } catch (error) {
      console.error('Error updating rating:', error);
    }
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
            <span className="text-gray-900">{college?.name}</span>
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
                  src={college?.images[0] || "/placeholder.svg"}
                  alt={college?.name || ""}
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
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{college?.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{college?.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-[11px]">{college?.address}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Est. {college?.established}</span>
                    <span>•</span>
                    <span>{college?.type}</span>
                    <span>•</span>
                    <span>{college?.affiliation}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex flex-col items-start gap-4">
                  {/* ✅ Existing Average Rating Display */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-green-100 px-3 py-2 rounded-lg">
                      <Star className="w-5 h-5 fill-green-600 text-green-600 mr-2" />
                      <span className="font-bold text-green-700 text-lg">{college?.rating}</span>
                    </div>
                    <span>Rate Us</span>
                    <StarRating initialRating={0} onRate={handleRatingChange} onSubmit={handleRatingSubmit} />
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{college?.contact?.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{college?.contact?.email}</span>
                  </div>
                  <div className="flex items-center gap-4">
                      <Link href={college?.links?.website || ""} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-5 h-5 text-gray-600 hover:text-blue-600 transition" />
                      </Link>
                      <Link href={college?.links?.facebook || ""} target="_blank" rel="noopener noreferrer">
                        <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-500 transition" />
                      </Link>

                      <Link href={college?.links?.instagram || ""} target="_blank" rel="noopener noreferrer">
                        <InstagramIcon className="w-5 h-5 text-gray-600 hover:text-pink-500 transition" />
                      </Link>

                      <Link href={college?.links?.linkedin || ""} target="_blank" rel="noopener noreferrer">
                        <LinkedinIcon className="w-5 h-5 text-gray-600 hover:text-blue-700 transition" />
                      </Link>
                  </div>

                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                      <a href={college?.brochureLink} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        Download Brochure
                      </a>
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
            {college?.highlights.map((highlight, index) => (
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
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {college?.shortName}</CardTitle>
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
                      {college?.courses.map((course, index) => (
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
                      {college?.admissionProcess?.map((step, index) => (
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
{/* 
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
                </Card> */}
              </TabsContent>

              <TabsContent value="placements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Placement Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                      {college?.averagePackage && (
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {college.averagePackage}
                          </div>
                          <div className="text-sm text-gray-600">Average Package</div>
                        </div>
                      )}

                      {college?.highestPackage && (
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {college.highestPackage}
                          </div>
                          <div className="text-sm text-gray-600">Highest Package</div>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Top Recruiters</h4>
                      <div className="flex flex-wrap gap-2">
                        {college?.topRecruiters.map((recruiter, index) => (
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
                      {college?.facilities?.map((facility, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm">{facility}</span>
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
                <CardTitle className="text-lg">Google Map</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <iframe
                src="https://www.google.com/maps?q=NARAYANA%20INSTITUTE%20OF%20MANAGEMENT%2C%20RAVIVENKATAMPALLI%20(VILLAGE)%2C%20ANANTAPUR%2C%20ANDHRA%20PRADESH&output=embed"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "12px" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              </CardContent>
            </Card>
            <Image src={"https://tpc.googlesyndication.com/simgad/18114101648311561798"} alt={college?.name || ""} width={250} height={250} className="w-full h-40 rounded-lg" />
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
