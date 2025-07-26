"use client";

import { useState } from "react";
import useSWR from "swr";
import {
  Table,
  Spin,
  Button,
  Space,
  Tooltip,
  Modal,
  Form,
  Input,
  message,
  Select,
  Tag
} from "antd";
import { EditOutlined, EyeOutlined, CheckCircleOutlined, ClockCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { fetcher, updateOrderProduct } from "@/lib/api/api";

interface OrderProduct {
  id: string;
  productName: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  totalPrice: number;
  status?: string;
}

export default function OrderProducts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrderProduct, setEditingOrderProduct] = useState<OrderProduct | null>(null);
  const [form] = Form.useForm();
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewingOrder, setViewingOrder] = useState<OrderProduct | null>(null);

  const { data, error, isLoading, mutate } = useSWR("/orders/products/getAll", fetcher);

  const handleEdit = (record: OrderProduct) => {
    setEditingOrderProduct(record);
    form.setFieldsValue({
      productName: record.productName,
      customerName: record.customerName,
      phone: record.phone,
      email: record.email,
      address: record.address,
      totalPrice: record.totalPrice,
      status: record.status || "pending",
    });
    setIsModalOpen(true);
  };

  const handleView = (record: OrderProduct) => {
    setViewingOrder(record);
    setViewModalOpen(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingOrderProduct) {
        await updateOrderProduct(editingOrderProduct.id, values);
        message.success("Cập nhật đơn đặt hàng thành công!");
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingOrderProduct(null);
      mutate();
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingOrderProduct(null);
  };

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
          case "pending":
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

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">
          Quản lý đơn đặt hàng
        </h1>
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
      ) : (
        <Table
          columns={columns}
          dataSource={data?.orderProducts || []}
          pagination={false}
          rowKey={(item: OrderProduct) => item.id}
          className="bg-white rounded-lg"
          rowClassName="hover:bg-gray-50"
        />
      )}

      {/* Edit Order Modal */}
      <Modal
        title={
          <h2 className="text-2xl font-bold mb-6 text-center">
            Chỉnh sửa đơn đặt hàng
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
            label={<span className="font-semibold">Sản phẩm</span>}
            name="productName"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold">Tên khách hàng</span>}
            name="customerName"
            rules={[{ required: true, message: "Vui lòng nhập tên khách hàng!" }]}
          >
            <Input placeholder="Nhập tên khách hàng" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={<span className="font-semibold">Số điện thoại</span>}
              name="phone"
              rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" }
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
          </div>

          <Form.Item
            label={<span className="font-semibold">Địa chỉ</span>}
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input.TextArea placeholder="Nhập địa chỉ" rows={3} />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={<span className="font-semibold">Tổng tiền</span>}
              name="totalPrice"
              rules={[{ required: true, message: "Vui lòng nhập tổng tiền!" }]}
            >
              <Input placeholder="Nhập tổng tiền" />
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
              </Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>

      {/* View Order Modal */}
      <Modal
        title={
          <h2 className="text-2xl font-bold mb-6 text-center">
            Thông tin chi tiết đơn hàng
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
                Sản phẩm:
              </span>{" "}
              {viewingOrder.productName}
            </p>
            <p>
              <span className="font-semibold text-gray-700 inline-block mr-4">
                Tên khách hàng:
              </span>{" "}
              {viewingOrder.customerName}
            </p>
            <p>
              <span className="font-semibold text-gray-700 inline-block mr-4">
                Số điện thoại:
              </span>{" "}
              {viewingOrder.phone}
            </p>
            <p>
              <span className="font-semibold text-gray-700 inline-block mr-4">
                Email:
              </span>{" "}
              {viewingOrder.email}
            </p>
            <p>
              <span className="font-semibold text-gray-700 inline-block mr-4">
                Địa chỉ:
              </span>{" "}
              {viewingOrder.address}
            </p>
            <p>
              <span className="font-semibold text-gray-700 inline-block mr-4">
                Tổng tiền:
              </span>{" "}
              <span className="text-orange-500 font-bold">
                {viewingOrder.totalPrice
                  ? viewingOrder.totalPrice
                    .toLocaleString("vi-VN", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })
                    .replace(/,/g, ".") + "₫"
                  : "0₫"}
              </span>
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
