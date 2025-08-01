import Image from "next/image"
import { CheckCircle, Users, TrendingUp, Shield, Zap, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/header"

export default function B2BPage() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Student Database Access",
      description:
        "Access to verified student profiles and contact information for targeted recruitment and marketing campaigns.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: "Analytics & Insights",
      description:
        "Detailed analytics on student preferences, course trends, and market insights to make informed decisions.",
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Brand Promotion",
      description:
        "Promote your institution or services through our platform with targeted advertising and featured listings.",
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-600" />,
      title: "Lead Generation",
      description:
        "Generate quality leads for admissions, courses, and educational services through our extensive network.",
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-600" />,
      title: "PAN India Reach",
      description:
        "Connect with students across all states and union territories of India through our comprehensive platform.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-indigo-600" />,
      title: "Verified Listings",
      description: "Get verified college and course listings with enhanced visibility and credibility on our platform.",
    },
  ]

  const services = [
    {
      title: "College Partnership Program",
      description: "Partner with us to increase your college's visibility and attract more students",
      features: [
        "Featured college listings",
        "Priority search results",
        "Dedicated college page",
        "Student inquiry management",
      ],
      price: "Starting from ₹50,000/year",
    },
    {
      title: "Recruitment Solutions",
      description: "Connect with talented students for internships, placements, and job opportunities",
      features: [
        "Access to student database",
        "Job posting platform",
        "Campus recruitment support",
        "Talent matching algorithms",
      ],
      price: "Starting from ₹25,000/month",
    },
    {
      title: "Educational Services Marketing",
      description: "Promote your coaching institutes, online courses, and educational services",
      features: ["Targeted advertising", "Course listing platform", "Student lead generation", "Performance analytics"],
      price: "Starting from ₹15,000/month",
    },
  ]

  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      position: "Director, ABC Engineering College",
      content:
        "EduFinder's B2B solutions have significantly increased our student inquiries by 300%. Their platform is user-friendly and the support team is excellent.",
      image: "/placeholder.svg?height=60&width=60&text=RK",
    },
    {
      name: "Priya Sharma",
      position: "HR Manager, TechCorp Solutions",
      content:
        "We've been able to recruit top talent from premier institutions through EduFinder's recruitment platform. Highly recommended for campus hiring.",
      image: "/placeholder.svg?height=60&width=60&text=PS",
    },
    {
      name: "Vikram Singh",
      position: "Founder, LearnTech Academy",
      content:
        "The lead generation and marketing tools provided by EduFinder have helped us reach students across India. Our enrollment has doubled in just 6 months.",
      image: "/placeholder.svg?height=60&width=60&text=VS",
    },
  ]

  const stats = [
    { number: "500+", label: "Partner Colleges" },
    { number: "2M+", label: "Student Reach" },
    { number: "1000+", label: "Recruiters" },
    { number: "28", label: "States Covered" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Grow Your Business with
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                EduFinder B2B Solutions
              </span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Connect with 2M+ students across India. Boost admissions, recruit talent, and grow your educational
              business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                Get Started Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg bg-transparent"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose EduFinder B2B?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leverage our comprehensive platform to reach students, generate leads, and grow your educational business
              across India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow p-6">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our B2B Services</h2>
            <p className="text-xl text-gray-600">
              Tailored solutions for colleges, recruiters, and educational service providers
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <p className="text-gray-600">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-lg font-bold text-blue-600 mb-4">{service.price}</div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Learn More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Partners Say</h2>
            <p className="text-xl text-gray-600">
              Trusted by leading educational institutions and companies across India
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-6">
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <div className="font-bold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.position}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl opacity-90">Contact our B2B team to discuss how we can help grow your business</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div>
                    <strong>Email:</strong> b2b@edufinder.com
                  </div>
                  <div>
                    <strong>Phone:</strong> +91-1800-572-9877
                  </div>
                  <div>
                    <strong>Business Hours:</strong> Mon-Fri, 9 AM - 6 PM IST
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4">Why Partner with Us?</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      PAN India student reach
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Verified and quality leads
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      24/7 customer support
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Flexible pricing plans
                    </li>
                  </ul>
                </div>
              </div>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="First Name"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                      />
                      <Input
                        placeholder="Last Name"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                      />
                    </div>
                    <Input
                      placeholder="Company/Institution Name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                    />
                    <Input
                      placeholder="Email Address"
                      type="email"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                    />
                    <Input
                      placeholder="Phone Number"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                    />
                    <Textarea
                      placeholder="Tell us about your requirements..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                      rows={4}
                    />
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
