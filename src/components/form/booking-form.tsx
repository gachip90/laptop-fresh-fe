"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { createOrderService, fetcher } from "@/lib/api/api";
import { OrderServiceData } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { Form, Input, Select, Button, TimePicker, message } from "antd";

const { Option } = Select;

interface BookingFormProps {
  selectedServiceType?: string;
  onSuccess?: () => void;
}

export function BookingForm({
  selectedServiceType,
  onSuccess,
}: BookingFormProps) {
  const { isLoggedIn, user } = useAuth();
  const [form] = Form.useForm();
  const { data, error, isLoading } = useSWR("/services/getAll", fetcher);
  const [loading, setLoading] = useState(false);

  const service = data?.services.map((item: any, index: any) => {
    return item.serviceName;
  });

  // Auto-fill service type when component mounts or selectedServiceType changes
  useEffect(() => {
    if (selectedServiceType) {
      form.setFieldsValue({
        serviceType: selectedServiceType,
      });
    }
  }, [selectedServiceType, form]);

  const onFinish = async (values: OrderServiceData) => {
    setLoading(true);
    try {
      // Kiểm tra user đã đăng nhập chưa
      if (!isLoggedIn) {
        message.warning("Vui lòng đăng nhập để đặt lịch!");
        return;
      }

      const payload: OrderServiceData = {
        userId: user?.userId,
        fullName: values.fullName,
        phone: values.phone,
        serviceType: values.serviceType,
        studentId: values.studentId,
        email: values.email,
        serviceDetail: values.serviceDetail,
        deviceInfo: values.deviceInfo,
        date: values.date,
        time: values.time,
        location: values.location,
        note: values.note,
        status: "pending",
      };

      // Gọi API
      await createOrderService(payload);
      message.success("Đặt lịch thành công!");

      // Reset form và đóng modal
      form.resetFields();
      onSuccess?.();
    } catch (error: any) {
      console.error("Lỗi khi gọi API:", error);

      // Xử lý lỗi chi tiết hơn
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Có lỗi xảy ra khi đặt lịch!";

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form
        form={form}
        name="booking_form"
        onFinish={onFinish}
        layout="vertical"
        className="max-w-full"
      >
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Thông tin đặt lịch
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={<span className="font-semibold">Họ và tên</span>}
              name="fullName"
              rules={[
                { required: true, message: "Vui lòng nhập họ và tên!" },
              ]}
            >
              <Input placeholder="Nguyễn Văn A" />
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold">Mã sinh viên</span>}
              name="studentId"
              rules={[
                { required: true, message: "Vui lòng nhập mã sinh viên!" },
              ]}
            >
              <Input placeholder="SE123456" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={<span className="font-semibold">Email</span>}
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Vui lòng nhập email hợp lệ!",
                },
              ]}
            >
              <Input placeholder="ten@fpt.edu.vn" />
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold">Số điện thoại</span>}
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input placeholder="0901234567" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={<span className="font-semibold">Loại dịch vụ</span>}
              name="serviceType"
              rules={[
                { required: true, message: "Vui lòng chọn loại dịch vụ!" },
              ]}
            >
              <Select
                placeholder={
                  isLoading ? "Đang tải dịch vụ..." : "Chọn loại dịch vụ"
                }
                loading={isLoading}
                disabled={isLoading || error}
              >
                {service && service.length > 0 ? (
                  service.map((serviceName: string, index: number) => (
                    <Option key={index} value={serviceName}>
                      {serviceName}
                    </Option>
                  ))
                ) : error ? (
                  <Option value="" disabled>
                    Lỗi tải dịch vụ
                  </Option>
                ) : (
                  <Option value="" disabled>
                    Không có dịch vụ
                  </Option>
                )}
              </Select>
            </Form.Item>
            <Form.Item
              label={<span className="font-semibold">Chi tiết dịch vụ</span>}
              name="serviceDetail"
              rules={[
                {
                  required: true,
                  message: "Vui lòng ghi chi tiết về dịch vụ!",
                },
              ]}
            >
              <Input placeholder="Nâng cấp ổ cứng SSD 256GB" />
            </Form.Item>
          </div>

          <Form.Item
            label={<span className="font-semibold">Thông tin thiết bị</span>}
            name="deviceInfo"
          >
            <Input.TextArea
              placeholder="VD: Dell Inspiron 15, RAM 8GB, SSD 256GB"
              rows={3}
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item
              label={<span className="font-semibold">Ngày mong muốn</span>}
              name="date"
              rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
            >
              <Input type="date" />
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold">Giờ mong muốn</span>}
              name="time"
              rules={[{ required: true, message: "Vui lòng chọn giờ!" }]}
            >
              <TimePicker
                placeholder="Chọn giờ"
                format="HH:mm"
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold">Địa điểm</span>}
              name="location"
              rules={[{ required: true, message: "Vui lòng nhập địa điểm!" }]}
            >
              <Input placeholder="Nhập địa điểm" />
            </Form.Item>
          </div>

          <Form.Item
            label={<span className="font-semibold">Ghi chú</span>}
            name="note"
          >
            <Input.TextArea
              placeholder="Mô tả chi tiết nếu bạn có điều gì cần lưu ý..."
              rows={3}
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-center gap-4 pt-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="bg-blue-500 hover:bg-blue-600 px-8"
              >
                Gửi thông tin đặt lịch
              </Button>
            </div>
          </Form.Item>
        </div>
      </Form>

    </div>
  );
}
