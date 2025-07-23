"use client";

import useSWR from "swr";
import { Table, Card, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import { fetcher } from "@/lib/api/api";

interface OrderProduct {
  id: string;
  productName: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  totalPrice: number;
}

export default function OrderProducts() {
  const { data, error, isLoading } = useSWR("/orders/products/getAll", fetcher);
  console.log("Order products data:", data);

  const columns: ColumnsType<OrderProduct> = [
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      key: "productName",
      className: "text-gray-700 font-semibold",
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      className: "text-gray-600",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      className: "text-gray-600",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "text-gray-600",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      className: "text-gray-600",
    },
    {
      title: "Giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
      className: "text-gray-700 font-semibold",
      render: (price: number) =>
        price
          ? price
              .toLocaleString("vi-VN", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })
              .replace(/,/g, ".") + "₫"
          : "0₫",
    },
  ];

  if (error) {
    return (
      <div className="bg-white p-6">
        <div className="text-center text-red-500">
          Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">
          Quản lý đơn đặt hàng
        </h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <Card>
          <Table
            columns={columns}
            dataSource={data?.orderProducts || []}
            pagination={false}
            rowKey={(item: any) => item.id}
            className="bg-white rounded-lg"
            rowClassName="hover:bg-gray-50"
          />
        </Card>
      )}
    </div>
  );
}
