"use client";

import { useState } from "react";
import useSWR from "swr";
import { useAuth } from "@/hooks/useAuth";
import { UserData } from "@/types";
import { fetcher, updateUser } from "@/lib/api/api";
import {
  Button,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Card,
  Spin,
  message,
} from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";

export default function Profile() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const { data, error, isLoading, mutate } = useSWR(
    `/users/get/${user?.userId}`,
    fetcher
  );

  const showModal = () => {
    form.setFieldsValue(data?.user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = async (values: UserData) => {
    setLoading(false);
    try {
      await updateUser(user?.userId || "", values);

      mutate();
      message.success("Cập nhật thông tin thành công!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Có lỗi xảy ra", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      <Card className="shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <UserOutlined className="text-xl text-gray-600" />
            <h1 className="text-xl font-semibold">Thông tin cá nhân</h1>
          </div>

          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={showModal}
            className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
          >
            Chỉnh sửa
          </Button>
        </div>

        {/* Profile Information Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[48, 32]}>
            <Col xs={24} md={12}>
              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Họ và tên
                  </label>
                  <div className="text-gray-600 text-semibold bg-gray-50 px-3 py-2 rounded border">
                    {data?.user.fullName}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email
                  </label>
                  <div className="text-gray-600 bg-gray-50 px-3 py-2 rounded border">
                    {data?.user.email}
                  </div>
                </div>

                {/* Class */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Lớp
                  </label>
                  <div className="text-gray-600 bg-gray-50 px-3 py-2 rounded border">
                    {data?.user.className}
                  </div>
                </div>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="space-y-6">
                {/* Student ID */}
                <div>
                  <label className="block text-sm font-semibold  mb-2">
                    Mã sinh viên
                  </label>
                  <div className="text-gray-600 bg-gray-50 px-3 py-2 rounded border">
                    {data?.user.studentId}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Số điện thoại
                  </label>
                  <div className="text-gray-600 bg-gray-50 px-3 py-2 rounded border">
                    {data?.user.phone}
                  </div>
                </div>

                {/* Major */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Chuyên ngành
                  </label>
                  <div className="text-gray-600 bg-gray-50 px-3 py-2 rounded border">
                    {data?.user.major}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Card>

      {/* Edit Profile Modal */}
      <Modal
        title={
          <div className="text-center text-2xl mb-4">
            <span>Chỉnh sửa thông tin</span>
          </div>
        }
        centered
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-4"
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="font-semibold">Họ và tên</span>}
                name="fullName"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên!" },
                ]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="font-semibold">Mã sinh viên</span>}
                name="studentId"
                rules={[
                  { required: true, message: "Vui lòng nhập mã sinh viên!" },
                ]}
              >
                <Input placeholder="Nhập mã sinh viên" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="font-semibold">Email</span>}
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="font-semibold">Số điện thoại</span>}
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  {
                    pattern: /^[0-9]{10,11}$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="font-semibold">Lớp</span>}
                name="className"
                rules={[{ required: true, message: "Vui lòng nhập lớp!" }]}
              >
                <Input placeholder="Nhập lớp" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="font-semibold">Chuyên ngành</span>}
                name="major"
                rules={[
                  { required: true, message: "Vui lòng nhập chuyên ngành!" },
                ]}
              >
                <Input placeholder="Nhập chuyên ngành" />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end gap-2 mt-6">
            <Button onClick={handleModalClose}>Hủy</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
            >
              Lưu
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
