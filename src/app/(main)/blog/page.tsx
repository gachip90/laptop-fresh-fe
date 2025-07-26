import { Blogs } from "@/components/blog/blogs";

export default function BlogPage() {
  return (
    <div className="my-4">
      <div className="py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-4">
            Tin tức & Mẹo vặt
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cập nhật những thông tin mới nhất về công nghệ và mẹo sử dụng thiết
            bị hiệu quả
          </p>
        </div>
        <Blogs />
      </div>
    </div>
  );
}
