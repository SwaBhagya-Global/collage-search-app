'use client';

import { useCallback, useEffect, useState } from 'react';
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

const PAGE_LIMIT = 10;

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBlogs = useCallback(async (pageToLoad: number) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${BASE_URL}/blog?page=${pageToLoad}&limit=${PAGE_LIMIT}`);
      if (!res.ok) throw new Error('Failed to fetch blogs');

      const result = await res.json();
      const blogs = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
          ? result.data
          : Array.isArray(result?.blogs)
            ? result.blogs
            : [];

      setPosts((current) => pageToLoad === 1 ? blogs : [...current, ...blogs]);

      const pagination = result?.pagination ?? result?.meta ?? result;
      if (typeof pagination?.hasNextPage === 'boolean') {
        setHasMore(pagination.hasNextPage);
      } else if (typeof pagination?.hasMore === 'boolean') {
        setHasMore(pagination.hasMore);
      } else if (typeof pagination?.totalPages === 'number') {
        setHasMore(pageToLoad < pagination.totalPages);
      } else {
        setHasMore(blogs.length === PAGE_LIMIT);
      }
      setPage(pageToLoad);
    } catch (fetchError) {
      console.error(fetchError);
      setError('Could not load blogs. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchBlogs(1);
  }, [fetchBlogs]);

  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading blogs...</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 pb-12">
      <div className="py-8 text-center bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-primary mb-4">Our Blog&apos;s</h1>
          <p className="text-gray-600 text-lg">
            Explore expert insights, tips, and trends in MBA admissions and education.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-16 py-10 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
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
              />
              <div className="mt-4 text-right">
                <Link href={`/blog/${encodeURIComponent(post.title.toLowerCase().replace(/\s+/g, '-'))}`} className="text-blue-600 font-semibold hover:underline">
                  Read more →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {error && <p role="alert" className="text-center text-red-600">{error}</p>}
      {(hasMore || error) && (
        <div className="flex justify-center mt-8 mb-12">
          <Button
            onClick={() => void fetchBlogs(error ? page : page + 1)}
            disabled={loading}
            className="px-8 py-3 text-lg"
          >
            {loading ? 'Loading...' : error ? 'Try Again' : 'Load More'}
          </Button>
        </div>
      )}
    </section>
  );
}
