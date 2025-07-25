"use client";

import { Tabs } from "antd";
import AccountOrderServices from "@/components/account/order-services";
import AccountOrderProducts from "@/components/account/order-products";
import AccountFeedback from "@/components/account/feedback";
import AccountProfile from "@/components/account/profile";

export default function AccountPage() {
  const items = [
    {
      key: "1",
      label: "Thông tin cá nhân",
      children: <AccountProfile />,
    },
    {
      key: "2",
      label: "Lịch sử đặt lịch",
      children: <AccountOrderServices />,
    },
    {
      key: "3",
      label: "Lịch sử đặt hàng",
      children: <AccountOrderProducts />,
    },
    {
      key: "4",
      label: "Phản hồi",
      children: <AccountFeedback />,
    },
  ];

  return (
    <div className="my-4">
      <div className="py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-4">
            Quản lý tài khoản
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Xem và quản lý thông tin cá nhân, lịch sử đặt lịch của bạn
          </p>
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
