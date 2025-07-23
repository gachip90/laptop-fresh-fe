"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api/api";
import { Card, Spin, Tag } from "antd";

export default function Feedbacks() {
  const { data, error, isLoading } = useSWR("/feedbacks/getAll", fetcher);
  console.log("data", data);

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Quản lý phản hồi</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        data?.feedbacks.map((feedback: any) => (
          <div key={feedback.id} className="mb-6">
            <Card className="mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium mb-2">
                    {feedback.userName}
                  </p>
                  <p className="text-gray-500 font-semibold mb-2">
                    {feedback.title}
                  </p>
                  <p>{feedback.content}</p>
                </div>
                <Tag
                  color={
                    feedback.feedbackType === "service"
                      ? "blue"
                      : feedback.feedbackType === "technical"
                      ? "orange"
                      : feedback.feedbackType === "booking"
                      ? "green"
                      : feedback.feedbackType === "other"
                      ? "gray"
                      : "gray"
                  }
                >
                  {feedback.feedbackType === "service"
                    ? "Dịch vụ"
                    : feedback.feedbackType === "technical"
                    ? "Kỹ thuật"
                    : feedback.feedbackType === "booking"
                    ? "Đặt lịch"
                    : feedback.feedbackType === "other"
                    ? "Khác"
                    : feedback.feedbackType}
                </Tag>
              </div>
            </Card>
          </div>
        ))
      )}
    </div>
  );
}
