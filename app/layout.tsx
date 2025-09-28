// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { FaWhatsapp } from 'react-icons/fa';
import './globals.css';
import ClientAnalytics from '@/components/ClientAnalytics';
import ScrollToTop from '@/components/ScrollToTop';



const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admission in MBA - Find Your Best MBA / PGDM College',
  description:
    "India's largest education platform helping millions of students make informed career decisions across PAN India",
    keywords: [
    'MBA Admission',
    'PGDM Admission',
    'Best MBA Colleges in India',
    'Top PGDM Institutes',
    'MBA Courses',
    'Business Schools in India',
    'Management Colleges Admission',
    'MBA Entrance Exams',
    'Distance MBA',
    'Full-time MBA Programs'
  ],
  icons:{
    icon:'/favicon_icon.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Google Analytics scripts */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S6BL2Z41Z6"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S6BL2Z41Z6', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <ClientAnalytics />

        <Header />
        {children}
          
          <ScrollToTop />
        <a
          href="https://wa.me/917338235806"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
        >
          <span className="tooltip">Chat on WhatsApp</span>
          <FaWhatsapp size={32} />
        </a>

        <Footer />
      </body>
    </html>
  );
}
