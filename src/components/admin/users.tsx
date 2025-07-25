"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api/api";
import { Card, Spin, Tag } from "antd";

export default function AdminUser() {
  const { data, error, isLoading } = useSWR("/users/getAll", fetcher);
  console.log("data", data);

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Quản lý người dùng</h1>
      </div>

      {error ? (
        <div className="bg-white p-6">
          <div className="text-center text-red-500">
            Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại!
          </div>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : data?.users?.filter((user: any) => user.role === "user")?.length > 0 ? (
        data.users
          .filter((user: any) => user.role === "user")
          .map((user: any) => (
            <div key={user.id} className="mb-6">
              <Card key={user.id} className="mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium">{user.fullName}</p>
                    <p className="text-gray-500">{user.email}</p>
                  </div>
                  <Tag color={user.isDelete ? "red" : "blue"}>
                    {user.isDelete ? "Tạm khóa" : "Hoạt động"}
                  </Tag>
                </div>
              </Card>
            </div>
          ))
      ) : (
        <div className="bg-white p-6">
          <div className="text-center text-gray-500">
            <p className="text-lg mb-2">Chưa có người dùng!</p>
          </div>
        </div>
      )}
    </div>
  );
}
