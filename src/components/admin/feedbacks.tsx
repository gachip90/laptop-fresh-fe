"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api/api";
import { Card, Spin, Tag } from "antd";

export default function Feedbacks() {
  const { data, error, isLoading } = useSWR("/feedbacks/getAll", fetcher);

  const getFeedbackTypeInfo = (feedbackType: string) => {
    switch (feedbackType) {
      case "service":
        return { label: "Dịch vụ", color: "blue" };
      case "technical":
        return { label: "Kỹ thuật", color: "orange" };
      case "booking":
        return { label: "Đặt lịch", color: "green" };
      case "other":
        return { label: "Khác", color: "gray" };
      default:
        return { label: "Phản hồi", color: "blue" };
    }
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Quản lý phản hồi</h1>
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
      ) : data?.feedbacks?.length > 0 ? (
        data.feedbacks.map((feedback: any) => {
          const typeInfo = getFeedbackTypeInfo(feedback.feedbackType);
          return (
            <div key={feedback.id} className="mb-6">
              <Card className="mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium mb-2">{feedback.userName}</p>
                    <p className="text-md font-medium">{feedback.fullName}</p>
                    <p className="text-gray-500">{feedback.title}</p>
                    <p className="text-gray-600 mt-2">{feedback.content}</p>
                  </div>
                  <Tag color={typeInfo.color}>{typeInfo.label}</Tag>
                </div>
              </Card>
            </div>
          );
        })
      ) : (
        <div className="bg-white p-6">
          <div className="text-center text-gray-500">
            <p className="text-lg mb-2">Chưa có phản hồi!</p>
          </div>
        </div>
      )}
    </div>
  );
}
