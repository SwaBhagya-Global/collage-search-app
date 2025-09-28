"use client"

import { Facebook, InstagramIcon, LinkedinIcon } from "lucide-react"
import Link from "next/link"
import { FaPinterest, FaXTwitter } from "react-icons/fa6"
import { SiBluesky } from "react-icons/si"

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-12 gap-8 items-start">
            
            {/* Column 1: Logo (span 2) */}
            <div className="col-span-12 md:col-span-2 flex justify-center md:justify-start">
              <img src="../logo-mba.png" width={150} alt="Admission in MBA Logo" />
            </div>

            {/* Column 2: About Us (span 6) */}
            <div className="col-span-12 md:col-span-6 text-center md:text-left">
              <h3 className="font-semibold text-lg mb-3">About Us</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                Admission in MBA is your trusted platform to explore and apply to the *best MBA and PGDM colleges in India*. 
                With thousands of institutes listed, we make it easy to compare courses, fees, placements, rankings, and specialisations so you can make the right choice for your career. 
                Our student reviews, expert counselling, and transparent process ensure that you have all the guidance needed from search to admission. 
                Whether you are looking for top private universities, affordable colleges, or UGC-approved programs, Admission in MBA helps you find it all in one place.
                Start your MBA journey with confidence today and secure admission to the college that matches your ambition.
              </p>
            </div>

            {/* Column 3: Social Media (span 4) */}
            <div className="col-span-12 md:col-span-4 text-center md:text-right">
              <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
              <div className="flex justify-center md:justify-end gap-4">
                <Link href="https://www.facebook.com/AdmissionsinMBA1/" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-500 transition" />
                </Link>
                <Link href="https://www.instagram.com/admissioninmba" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className="w-5 h-5 text-gray-600 hover:text-pink-500 transition" />
                </Link>
                <Link href="https://www.linkedin.com/company/admissioninmba" target="_blank" rel="noopener noreferrer">
                  <LinkedinIcon className="w-5 h-5 text-gray-600 hover:text-blue-700 transition" />
                </Link>
                <Link href="https://in.pinterest.com/admissioninmba/" target="_blank" rel="noopener noreferrer">
                  <FaPinterest className="w-5 h-5 text-gray-600 hover:text-red-600 transition" />
                </Link>
                <Link href="https://x.com/admissionsinmba" target="_blank" rel="noopener noreferrer">
                  <FaXTwitter className="w-5 h-5 text-gray-600 hover:text-black transition" />
                </Link>
                <Link href="https://bsky.app/profile/admissioninmba.bsky.social" target="_blank" rel="noopener noreferrer">
                  <SiBluesky className="w-5 h-5 text-gray-600 hover:text-sky-500 transition" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="mt-10 pt-6 border-t border-gray-800 text-gray-500 text-sm text-center">
            © 2025 Admission In MBA. Made with ❤️ for students
          </div>
        </div>
      </footer>
    </>
  )
}
