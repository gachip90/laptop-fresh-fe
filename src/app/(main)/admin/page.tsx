"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api/api";
import { Tabs } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  BarChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import AdminService from "@/components/admin/services";
import AdminBlog from "@/components/admin/blogs";
import AdminUser from "@/components/admin/users";
import AdminFeedback from "@/components/admin/feedbacks";
import AdminProduct from "@/components/admin/products";
import AdminOrderService from "@/components/admin/order-services";
import AdminOrderProduct from "@/components/admin/order-products";

export default function AdminPage() {
  const { data, error, isLoading } = useSWR("/admin/stats", fetcher);
  console.log("Admin stats data:", data);
  const items = [
    {
      key: "1",
      label: "Dịch vụ",
      children: <AdminService />,
    },
    {
      key: "2",
      label: "Sản phẩm",
      children: <AdminProduct />,
    },
    {
      key: "3",
      label: "Bài viết",
      children: <AdminBlog />,
    },
    {
      key: "4",
      label: "Đơn đặt lịch",
      children: <AdminOrderService />,
    },
    {
      key: "5",
      label: "Đơn đặt hàng",
      children: <AdminOrderProduct />,
    },
    {
      key: "6",
      label: "Phản hồi",
      children: <AdminFeedback />,
    },
    {
      key: "7",
      label: "Người dùng",
      children: <AdminUser />,
    },
  ];

  const statsData = [
    {
      title: "Tổng người dùng",
      value: `${data?.stats.totalUsers || 0} `,
      icon: <UserOutlined className="!text-white text-xl" />,
      bgColor: "bg-blue-500",
    },
    {
      title: "Tổng đơn đặt lịch",
      value: `${data?.stats.totalBookings || 0}`,
      icon: <CalendarOutlined className="!text-white text-xl" />,
      bgColor: "bg-green-500",
    },
    {
      title: "Dịch vụ hoạt động",
      value: `${data?.stats.activeServices || 0}`,
      icon: <SettingOutlined className="!text-white text-xl" />,
      bgColor: "bg-purple-500",
    },
    {
      title: "Tổng doanh thu",
      value: `${Number(data?.stats.totalRevenue || 0)
        .toLocaleString("vi-VN", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
        .replace(/,/g, ".")}`,
      icon: <BarChartOutlined className="!text-white text-xl" />,
      bgColor: "bg-orange-500",
    },
  ];

  return (
    <div className="my-4">
      <div className="py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-4">
            Quản trị hệ thống
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chào mừng Admin
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md border border-gray-100 p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex-1">
                  <p className="text-gray-500 text-sm font-medium mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center ml-4`}
                >
                  {stat.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <Tabs
            defaultActiveKey="1"
            centered
            size="large"
            items={items}
            className="custom-tabs"
          />
        </div>
      </div>
    </div>
  );
}
