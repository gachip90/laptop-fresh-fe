import Link from "next/link";
import { Button } from "antd";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Không tìm thấy bài viết
        </h2>
        <p className="text-gray-600 mb-8">
          Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/blogs">
            <Button type="primary" icon={<ArrowLeftOutlined />}>
              Quay lại Blog
            </Button>
          </Link>
          <Link href="/">
            <Button icon={<HomeOutlined />}>Trang chủ</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
