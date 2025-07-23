"use client";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import {
  CalendarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Button, Spin } from "antd";
import Link from "next/link";
import { fetcher } from "@/lib/api/api";
import type { Blog } from "@/types";
import Title from "antd/es/skeleton/Title";
import Paragraph from "antd/es/skeleton/Paragraph";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data, error, isLoading } = useSWR(`/blogs/get/${slug}`, fetcher);

  console.log("blog content", data?.blog.content);

  const formatContent = (text: string) => {
    if (!text) return [];
    return text.split("\n\n").filter((paragraph) => paragraph.trim());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !data?.blog) {
    notFound();
  }

  const blog: Blog = data.blog;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/blogs">
            <Button
              icon={<ArrowLeftOutlined />}
              type="text"
              className="text-blue-600 hover:text-blue-800"
            >
              Quay lại danh sách blog
            </Button>
          </Link>
        </div>

        {/* Blog Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Author and Date Info */}
          <div className="flex items-center justify-center gap-4 text-gray-600 text-sm mb-8">
            <div className="flex items-center gap-2">
              <UserOutlined />
              <span className="font-medium text-gray-700">{blog.author}</span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarOutlined />
              <span className="font-medium text-gray-700">
                {blog.publishedDate}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <ClockCircleOutlined />
              <span className="font-medium text-gray-700">{blog.readTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {blog.image && (
          <div className="mb-8">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              <Image
                src={blog.image || "/placeholder.svg"}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Blog Content */}
        <article className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6">
            <p className="text-lg font-semibold">{blog.description}</p>

            {blog.content ? (
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            ) : (
              <div className="space-y-4">
                <p>
                  Laptop không chỉ là công cụ hỗ trợ công việc mà còn là người
                  bạn đồng hành trong học tập, giải trí và kết nối thế giới. Tuy
                  nhiên, sau một thời gian sử dụng, việc laptop trở nên chậm
                  chạp, gặt lạt khiến bạn không khỏi bức xúc.
                </p>
                <p>
                  Trong bài viết này, chúng tôi sẽ chia sẻ những mẹo hữu ích để
                  tối ưu hiệu suất laptop của bạn một cách hiệu quả nhất.
                </p>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
