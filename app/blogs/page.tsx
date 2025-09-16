'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import BASE_URL from '../config/api';

interface BlogPost {
  _id: string;
  date: string;
  title: string;
  content: string;
  author: string;
  coverImage: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/blog`);
        if (!res.ok) throw new Error('Failed to fetch blogs');
        const data = await res.json();
        // Check if data is array or wrapped in object
        const blogsArray = Array.isArray(data) ? data : data?.data || [];
        setPosts(blogsArray);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading blogs...</p>
      </div>
    );
  }

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
        {posts.slice(0, visibleCount).map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full"
          >
            <div className="relative h-56 w-full">
              <Image
                src={post.coverImage || '/blog.png'}
                alt={post.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="text-sm text-gray-500 mb-2">{post.date} • {post.author}</div>
              <h2 className="text-xl font-semibold text-gray-900 hover:text-primary mb-3 transition-colors line-clamp-2">
                {post.title}
              </h2>
              <div
                className="text-gray-600 flex-1 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>
              <div className="mt-4 text-right">
                <Link href={`/blog/${encodeURIComponent(post?.title.toLowerCase().replace(/\s+/g, '-'))}`} className="text-blue-600 font-semibold hover:underline">
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
