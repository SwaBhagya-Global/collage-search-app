'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const posts = [
  {
    id: 1,
    date: 'Sept 07, 2025',
    title: 'Why Choose an MBA in India? Top Benefits for Your Career',
    content:
      'An MBA (Master of Business Administration) is one of the most sought-after postgraduate degrees across the globe...',
    author: 'Admin',
    image: '/blog.png'
  },
  {
    id: 2,
    date: 'Sept 07, 2025',
    title: 'Top MBA Specializations in India and Their Career Scope',
    content:
      'Choosing the right specialization is one of the most important decisions during an MBA. With dozens of options available...',
    author: 'Admin',
    image: '/blog.png'
  },
];

export default function BlogPage() {
  const [visibleCount, setVisibleCount] = useState(6);

  return (
    <section className="bg-gray-50 pb-12">
      {/* Hero Section */}
      <div className="py-8 text-center bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-primary mb-4">
            Our Blog's
          </h1>
          <p className="text-gray-600 text-lg">
            Explore expert insights, tips, and trends in MBA admissions and education.
          </p>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="container mx-auto px-6 lg:px-16 py-10 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, visibleCount).map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full"
          >
            <div className="relative h-56 w-full">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="text-sm text-gray-500 mb-2">{post.date} • {post.author}</div>
              <h2 className="text-xl font-semibold text-gray-900 hover:text-primary mb-3 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 flex-1">{post.content}</p>
              <div className="mt-4 text-right">
                <Link href={`/blog/${post.id}`} className="text-blue-600 font-semibold hover:underline">
                  Read more →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < posts.length && (
        <div className="flex justify-center mt-8 mb-12">
          <Button onClick={() => setVisibleCount(visibleCount + 6)} className="px-8 py-3 text-lg">
            Load More
          </Button>
        </div>
      )}
    </section>
  );
}
