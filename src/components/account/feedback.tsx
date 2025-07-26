"use client";

import { Button, Form, Input, message, Select } from "antd";
import { MessageOutlined, SendOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { createFeedback } from "@/lib/api/api";
import { Feedback } from "@/types";

const { TextArea } = Input;
const { Option } = Select;

export default function Feedbacks() {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, user } = useAuth();
  const [form] = Form.useForm();

  const handleSubmit = async (values: Feedback) => {
    setLoading(true);
    try {
      if (!isLoggedIn) {
        message.warning("Vui lòng đăng nhập để gửi phản hồi");
        return;
      }

      await createFeedback({ ...values, userId: user?.userId });

      message.success("Gửi phản hồi thành công!");
      form.resetFields();
    } catch (error) {
      console.error("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div className="flex items-center gap-3 mb-8">
          <MessageOutlined className="text-xl" />
          <h3 className="text-xl font-semibold text-gray-800">Gửi phản hồi</h3>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-6"
        >
          <Form.Item
            label={<span className="font-semibold">Loại phản hôi</span>}
            name="feedbackType"
            rules={[
              { required: true, message: "Vui lòng chọn loại phản hồi!" },
            ]}
          >
            <Select
              size="large"
              placeholder="Loại dịch vụ"
              className="w-full"
            >
              <Option value="service">Dịch vụ</Option>
              <Option value="technical">Kỹ thuật</Option>
              <Option value="booking">Đặt lịch</Option>
              <Option value="other">Khác</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold">Tiêu đề</span>}
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <Input
              size="large"
              placeholder="Nhập tiêu đề phản hồi"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold">Nội dung</span>}
            name="content"
            rules={[
              { required: true, message: "Vui lòng nhập nội dung phản hồi!" },
            ]}
          >
            <TextArea
              rows={8}
              placeholder="Mô tả chi tiết phản hồi của bạn..."
              className="rounded-lg resize-none"
            />
          </Form.Item>

          <div className="flex justify-end pt-4">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              icon={<SendOutlined />}
              onClick={() => handleSubmit}
              loading={loading}
              className="bg-orange-500 hover:bg-orange-600 border-orange-500 px-8"
            >
              Gửi phản hồi
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
