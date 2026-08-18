"use client"

import { usePathname } from "next/navigation"
import { FaWhatsapp } from "react-icons/fa"
import Header from "@/components/header"
import Footer from "@/components/footer"

/** Public site chrome. Admin routes intentionally use their own layout. */
export default function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <a
        href="https://wa.me/917338235806"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
      >
        <span className="tooltip">Chat on WhatsApp</span>
        <FaWhatsapp size={32} />
      </a>
      {children}
      <Footer />
    </>
  )
}
