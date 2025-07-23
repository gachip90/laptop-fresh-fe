"use client";

import { useState } from "react";
import useSWR from "swr";
import { Input, Select, Tag, Card, Avatar, Button, Spin } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  BarsOutlined,
  BookOutlined,
  ToolOutlined,
  RocketOutlined,
  GiftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetcher } from "@/lib/api/api";
import type { Blog } from "@/types";

const { Search } = Input;
const { Option } = Select;

const categories = [
  { key: "all", label: "Tất cả", icon: <BarsOutlined /> },
  { key: "Mẹo vặt", label: "Mẹo vặt", icon: <BookOutlined /> },
  { key: "Bảo dưỡng", label: "Bảo dưỡng", icon: <ToolOutlined /> },
  { key: "Nâng cấp", label: "Nâng cấp", icon: <RocketOutlined /> },
  { key: "Khuyến mãi", label: "Khuyến mãi", icon: <GiftOutlined /> },
];

export function Blogs() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const router = useRouter();

  const { data, error, isLoading } = useSWR("/blogs/getAll", fetcher);
  console.log("data", data);

  const slug = data?.blogs.map((item: any, index: any) => {
    return item.slug;
  });

  console.log("slug", slug);

  // Function to create slug from title or use existing slug

  // Function to handle navigation to blog detail
  const handleReadMore = (slug: string) => {
    router.push(`/blogs/${slug}`);
  };

  // Filter blogs based on active category
  const filteredBlogs =
    data?.blogs?.filter((blog: Blog) => {
      if (activeCategory === "all") {
        return true;
      }
      return blog.category === activeCategory;
    }) || [];

  // Further filter by search value if needed
  const searchFilteredBlogs = filteredBlogs.filter(
    (blog: Blog) =>
      blog.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="flex justify-center">
            <Spin size="large" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">
            Có lỗi xảy ra khi tải dữ liệu
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Category Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <div
            key={category.key}
            onClick={() => setActiveCategory(category.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
              activeCategory === category.key
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-500"
            }`}
          >
            <span>{category.icon}</span>
            {category.label}
          </div>
        ))}
      </div>

      {/* Featured Articles Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {activeCategory === "all"
            ? "Tất cả bài viết"
            : `Bài viết về ${
                categories.find((cat) => cat.key === activeCategory)?.label
              }`}
          {searchValue && ` - Kết quả tìm kiếm: "${searchValue}"`}
        </h2>

        {searchFilteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              {searchValue
                ? "Không tìm thấy bài viết nào phù hợp"
                : "Chưa có bài viết nào trong danh mục này"}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {searchFilteredBlogs.map((blog: Blog) => (
              <Card
                key={blog.id}
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0 rounded-xl"
                styles={{ body: { padding: 0 } }}
              >
                <div className="relative">
                  <Image
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Tag
                    color="blue"
                    className="absolute top-4 left-5 px-3 py-1 rounded-full font-medium border-0"
                  >
                    {blog.category}
                  </Tag>
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-500 cursor-pointer transition-colors"
                    onClick={() => handleReadMore(blog.slug)}
                  >
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {blog.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Avatar size="small" icon={<UserOutlined />} />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarOutlined />
                        <span>{blog.publishedDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockCircleOutlined />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                  {/* Read More Button */}
                  <div className="flex justify-center">
                    <Button
                      color="blue"
                      variant="solid"
                      className="mt-4"
                      onClick={() => handleReadMore(blog.slug)}
                    >
                      Đọc tiếp
                      <ArrowRightOutlined />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
