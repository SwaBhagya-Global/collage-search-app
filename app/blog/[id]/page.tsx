'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import BASE_URL from '@/app/config/api';

export function formatDate(dbDate: string): string {
  const date = new Date(dbDate);
  if (isNaN(date.getTime())) return dbDate;

  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  coverImage: string;
  publishedAt: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const id = params?.id; 

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/blog/name/${id}`);
        if (!res.ok) throw new Error('Failed to fetch blog');
        const result = await res.json();
        setBlog(result.data);
      } catch (error) {
        console.error(error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading)
    return <div className="text-center py-20 text-gray-500">Loading blog...</div>;

  if (!blog)
    return <div className="text-center py-20 text-gray-500">Blog not found</div>;

  const sanitizedContent = DOMPurify.sanitize(blog.content);
  const formattedDate = formatDate(blog.publishedAt);

  return (
    <main className="bg-gray-50 py-12 px-4 flex justify-center">
      <article className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {blog.coverImage && (
          <div className="relative w-full h-96 md:h-[500px]">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              style={{ objectFit: 'cover' }}
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-8 md:p-12 flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center">
            {blog.title}
          </h1>

          <div className="text-gray-500 text-sm md:text-base text-center">
            {formattedDate} • {blog.author}
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          <div className="prose prose-lg max-w-full mx-auto text-gray-700 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </div>
        </div>
      </article>
    </main>
  );
}
