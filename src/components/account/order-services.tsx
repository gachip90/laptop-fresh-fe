"use client";

import { Button, Tag, Card, message } from "antd";
import { useAuth } from "@/hooks/useAuth";
import useSWR from "swr";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { cancelOrderService, fetcher } from "@/lib/api/api";
import dayjs from "dayjs";
import { useState } from "react";

export default function AccountOrderServices() {
  const { user } = useAuth();
  const { data, error, isLoading, mutate } = useSWR(
    `/orders/services/get/${user?.userId}`,
    fetcher
  );
  const [loading, setLoading] = useState(false);

  const handleCancelClick = async (orderId: string) => {
    setLoading(true);
    try {
      await cancelOrderService(orderId);

      mutate();
      message.success("Hủy đơn đặt lịch thành công!");
    } catch (error) {
      console.error("Có lỗi xảy ra", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Tag icon={<CheckCircleOutlined />} color="green">
            Hoàn thành
          </Tag>
        );
      case "confirmed":
        return (
          <Tag icon={<ClockCircleOutlined />} color="blue">
            Đã xác nhận
          </Tag>
        );
      case "canceled":
        return (
          <Tag icon={<CloseCircleOutlined />} color="red">
            Đã hủy
          </Tag>
        );
      case "pending":
        return (
          <Tag icon={<InfoCircleOutlined />} color="orange">
            Chờ xử lý
          </Tag>
        );
      default:
        return (
          <Tag icon={<InfoCircleOutlined />} color="orange">
            Chờ xử lý
          </Tag>
        );
    }
  };

  return (
    <div className="mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Lịch sử đặt lịch
        </h3>
        <span className="text-gray-600">Tổng: {data?.orderService.length} đơn</span>
      </div>

      {(!data?.orderService || data.orderService.length === 0) ? (
        <div className="flex flex-col items-center justify-center py-16">
          <InfoCircleOutlined style={{ fontSize: 32, color: '#aaa' }} />
          <div className="mt-4 text-lg text-gray-600">Bạn chưa có đơn đặt lịch nào</div>
          <Button
            type="primary"
            className="mt-6 bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
            href="/booking"
          >
            Đặt lịch ngay
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {data?.orderService.map((booking: any) => (
            <div key={booking.id} className="mb-6">
              <Card className="shadow-sm border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-gray-800">
                      Mã đơn: {booking.orderCode}
                    </span>
                    {getStatusTag(booking.status)}
                  </div>
                  <span className="text-lg font-semibold text-orange-500">
                    {booking.price}
                  </span>
                </div>

                <h4 className="text-base font-medium text-gray-800 mb-4">
                  {booking.serviceType}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarOutlined />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <ClockCircleOutlined />
                    <span>{dayjs(booking.time, "HH:mm").format("hh:mm A")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <EnvironmentOutlined />
                    <span>{booking.location}</span>
                  </div>
                </div>

                {booking.technician && (
                  <div className="mb-2">
                    <span className="text-gray-600">Kỹ thuật viên: </span>
                    <span className="font-medium">{booking.technician}</span>
                  </div>
                )}

                {booking.note && (
                  <div className="mb-4">
                    <span className="text-gray-600">Ghi chú: </span>
                    <span>{booking.note}</span>
                  </div>
                )}

                {booking.status === "pending" && (

                  <Button
                    type="primary"
                    danger
                    loading={loading}
                    onClick={() => handleCancelClick(booking.id)}
                  >
                    Hủy đặt lịch
                  </Button>
                )}
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
