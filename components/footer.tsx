"use client"

import { Facebook, Globe, InstagramIcon, LinkedinIcon } from "lucide-react"
import Link from "next/link"

export default function Footer() {
    return (
        <>
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                        <img src="../logo-mba.png" width={150} />
                    </div>
                    <p className="text-gray-400 mb-6">Your journey to the perfect college starts here</p>
                    <div className="flex items-center justify-center gap-4">
                        <Link href={"https://www.facebook.com/AdmissionsinMBA1/"} target="_blank" rel="noopener noreferrer">
                            <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-500 transition" />
                        </Link>

                        <Link href={"https://www.instagram.com/admissioninmba"} target="_blank" rel="noopener noreferrer">
                            <InstagramIcon className="w-5 h-5 text-gray-600 hover:text-pink-500 transition" />
                        </Link>

                        <Link href={"https://www.linkedin.com/company/admissioninmba"} target="_blank" rel="noopener noreferrer">
                            <LinkedinIcon className="w-5 h-5 text-gray-600 hover:text-blue-700 transition" />
                        </Link>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-800 text-gray-500 text-sm">
                        © 2025 Admission In MBA. Made with ❤️ for students
                    </div>
                </div>
            </footer>
        </>
    )
}