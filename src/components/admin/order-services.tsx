"use client";

import {
  Table,
  Button,
  Space,
  Tooltip,
  Modal,
  Form,
  Input,
  message,
  Spin,
  Tag,
  Select,
} from "antd";
import {
  EditOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { fetcher, updateOrderService } from "@/lib/api/api";
import useSWR from "swr";
import type { OrderServiceData } from "@/types";

export default function OrderServices() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrderService, setEditingOrderService] =
    useState<OrderServiceData | null>(null);
  const [form] = Form.useForm();
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewingOrder, setViewingOrder] = useState<OrderServiceData | null>(
    null
  );

  const { data, error, isLoading, mutate } = useSWR(
    "/orders/services/getAll",
    fetcher
  );

  console.log("data", data);

  const handleEdit = (record: OrderServiceData) => {
    setEditingOrderService(record);
    form.setFieldsValue({
      serviceType: record.serviceType,
      fullName: record.fullName,
      phone: record.phone,
      date: record.date,
      location: record.location,
      status: record.status,
    });
    setIsModalOpen(true);
  };

  const handleView = (record: OrderServiceData) => {
    setViewingOrder(record);
    setViewModalOpen(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingOrderService) {
        await updateOrderService(editingOrderService.id!, values);
        message.success("Cập nhật đơn đặt lịch thành công!");
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingOrderService(null);
      mutate();
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      false;
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingOrderService(null);
  };

  const columns: ColumnsType<OrderServiceData> = [
    {
      title: "Dịch vụ",
      dataIndex: "serviceType",
      key: "serviceType",
      className: "text-gray-700 font-semibold",
    },
    {
      title: "Khách hàng",
      dataIndex: "fullName",
      key: "fullName",
      className: "text-gray-600",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      className: "text-gray-600",
    },
    {
      title: "Ngày hẹn",
      dataIndex: "date",
      key: "date",
      className: "text-gray-600",
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
      className: "text-gray-600",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      className: "text-gray-600",
      render: (status: string) => {
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
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              className="text-gray-500 hover:text-blue-500 hover:bg-blue-50"
            />
          </Tooltip>
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
              className="text-gray-500 hover:text-green-500 hover:bg-green-50"
            />
          </Tooltip>
        </Space>
      ),
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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">
          Quản lý đơn đặt lịch
        </h1>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={data?.orders || []}
          pagination={false}
          rowKey={(item: any) => item.id}
          className="bg-white rounded-lg"
          rowClassName="hover:bg-gray-50"
        />
      )}

      {/* Add/Edit Blog Modal */}
      <Modal
        title={
          <h2 className="text-2xl font-bold mb-6 text-center">
            Chỉnh sửa đơn đặt lịch
          </h2>
        }
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Lưu"
        cancelText="Hủy"
        width={600}
        okButtonProps={{
          className:
            "bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600",
        }}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            label={<span className="font-semibold">Dịch vụ</span>}
            name="serviceType"
            rules={[{ required: true, message: "Vui lòng nhập loại dịch vụ!" }]}
          >
            <Input placeholder="Nhập loại dịch vụ" />
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold">Họ tên khách hàng</span>}
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input placeholder="Nhập họ tên khách hàng" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={<span className="font-semibold">Ngày hẹn</span>}
              name="date"
              rules={[{ required: true, message: "Vui lòng nhập ngày hẹn!" }]}
            >
              <Input placeholder="Nhập ngày hẹn" />
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
            label={<span className="font-semibold">Số điện thoại</span>}
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold">Trạng thái</span>}
            name="status"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
          >
            <Select placeholder="Chọn trạng thái">
              <Select.Option value="pending">Chờ xử lý</Select.Option>
              <Select.Option value="confirmed">Đã xác nhận</Select.Option>
              <Select.Option value="completed">Hoàn thành</Select.Option>
              <Select.Option value="canceled">Đã hủy</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Order Modal */}
      <Modal
        title={
          <h2 className="text-2xl font-bold mb-6 text-center">
            Thông tin chi tiết
          </h2>
        }
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={null}
        width={600}
      >
        {viewingOrder && (
          <div className="space-y-3">
            <p>
              <span className="font-semibold text-gray-700 inline-block mr-4">
                Dịch vụ:
              </span>{" "}
              {viewingOrder.serviceType}
            </p>
            <p>
              <span className="font-semibold text-gray-700 inline-block mr-4">
                Họ tên khách hàng:
              </span>{" "}
              {viewingOrder.fullName}
            </p>
            <p>
              <span className="font-semibold text-gray-700 inline-block mr-4">
                Số điện thoại:
              </span>{" "}
              {viewingOrder.phone}
            </p>
            <p>
              <span className="font-semibold text-gray-700 inline-block mr-4">
                Ngày hẹn:
              </span>{" "}
              {viewingOrder.date}
            </p>
            <p>
              <span className="font-semibold text-gray-700 inline-block mr-4">
                Địa điểm:
              </span>{" "}
              {viewingOrder.location}
            </p>
            <p>
              <span className="font-semibold text-gray-700 inline-block mr-4">
                Trạng thái:
              </span>{" "}
              {(() => {
                switch (viewingOrder.status) {
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
                  default:
                    return (
                      <Tag icon={<InfoCircleOutlined />} color="orange">
                        Chờ xử lý
                      </Tag>
                    );
                }
              })()}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
