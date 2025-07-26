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

  const slug = data?.blogs.map((item: any, index: any) => {
    return item.slug;
  });


  // Function to create slug from title or use existing slug

  // Function to handle navigation to blog detail
  const handleReadMore = (slug: string) => {
    router.push(`/blog/${slug}`);
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

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex justify-center">
            <Spin size="large" />
          </div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">
            Có lỗi xảy ra khi tải dữ liệu
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Blog & Tin tức
            </h1>
            <p className="text-gray-600">
              Cập nhật những thông tin mới nhất về công nghệ và dịch vụ của chúng tôi
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Tìm kiếm bài viết..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                prefix={<SearchOutlined />}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={activeCategory}
                onChange={setActiveCategory}
                style={{ width: 150 }}
              >
                <Option value="all">Tất cả</Option>
                <Option value="Bảo dưỡng">Bảo dưỡng</Option>
                <Option value="Nâng cấp">Nâng cấp</Option>
                <Option value="Khuyến mãi">Khuyến mãi</Option>
              </Select>
              <Option value="Mẹo vặt">Mẹo vặt</Option>
              <Select
                value={sortBy}
                onChange={setSortBy}
                style={{ width: 150 }}
              >
                <Option value="all">Sắp xếp</Option>
                <Option value="newest">Mới nhất</Option>
                <Option value="oldest">Cũ nhất</Option>
              </Select>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchFilteredBlogs.map((blog: Blog) => (
              <Card
                key={blog.id}
                hoverable
                className="h-full"
                cover={
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blog.image || "/placeholder.svg"}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Tag color="blue">{blog.category}</Tag>
                    </div>
                  </div>
                }
                actions={[
                  <Button
                    key="read"
                    type="link"
                    onClick={() => blog.slug && handleReadMore(blog.slug)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Đọc thêm
                  </Button>
                ]}
              >
                <Card.Meta
                  title={
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                  }
                  description={
                    <div className="space-y-2">
                      <p className="text-gray-600 line-clamp-3">
                        {blog.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mt-2">
                        <div className="flex items-center gap-4 flex-1 justify-center md:justify-start">
                          <span className="flex items-center gap-1">
                            <UserOutlined /> {blog.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <CalendarOutlined /> {blog.publishedDate}
                          </span>
                        </div>
                        {blog.readTime && (
                          <span className="flex items-center gap-1 ml-auto">
                            <ClockCircleOutlined /> {blog.readTime}
                          </span>
                        )}
                      </div>
                    </div>
                  }
                />
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
