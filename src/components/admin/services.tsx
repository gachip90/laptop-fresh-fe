"use client";

import {
  Table,
  Button,
  Tag,
  Space,
  Tooltip,
  Modal,
  Form,
  Input,
  Select,
  message,
  Spin,
  Popconfirm,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import {
  fetcher,
  createService,
  updateService,
  deleteService,
} from "@/lib/api/api";
import useSWR from "swr";
import type { Service, ServiceData } from "@/types";

const { confirm } = Modal;
const { Option } = Select;

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<ServiceData | null>(
    null
  );
  const [form] = Form.useForm();

  const { data, error, isLoading, mutate } = useSWR(
    "/services/getAll",
    fetcher
  );

  const handleEdit = (record: ServiceData) => {
    setEditingService(record);
    const formData: Service = {
      serviceName: record.serviceName,
      description: record.description,
      price: record.price,
      time: record.time,
      location: record.location,
    };
    form.setFieldsValue(formData);
    setIsModalOpen(true);
  };

  const handleDelete = async (record: ServiceData) => {
    try {
      setDeleteLoading(record.id!);
      await deleteService(record.id!);
      message.success("Xóa dịch vụ thành công!");
      mutate();
    } catch (error) {
      console.error("Lỗi khi xóa dịch vụ:", error);
      message.error("Có lỗi xảy ra khi xóa dịch vụ!");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleAddService = () => {
    setEditingService(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          setLoading(true);

          if (editingService) {
            // Update existing service
            await updateService(editingService.id!, values);
            message.success("Cập nhật dịch vụ thành công!");
          } else {
            // Create new service
            await createService(values);
            message.success("Thêm dịch vụ thành công!");
          }

          setIsModalOpen(false);
          form.resetFields();
          setEditingService(null);
          mutate();
        } catch (error) {
          console.error("Có lỗi xảy ra:", error);
          message.error("Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
          setLoading(false);
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingService(null);
  };

  const columns: ColumnsType<ServiceData> = [
    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
      className: "text-gray-700 font-semibold",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      className: "text-gray-600",
      render: (text: string) => text || "Không có mô tả",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      className: "text-gray-600",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      className: "text-gray-600",
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
      className: "text-gray-600",
    },
    // {
    //   title: "Thao tác",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Tooltip title="Chỉnh sửa">
    //         <Button
    //           type="text"
    //           icon={<EditOutlined />}
    //           onClick={() => handleEdit(record)}
    //           className="text-gray-500 hover:text-blue-500 hover:bg-blue-50"
    //         />
    //       </Tooltip>
    //       <App>
    //         <Tooltip title="Xóa">
    //           <Button
    //             type="text"
    //             icon={<DeleteOutlined />}
    //             onClick={() => handleDelete(record)}
    //             className="text-gray-500 hover:text-red-500 hover:bg-red-50"
    //           />
    //         </Tooltip>
    //       </App>
    //     </Space>
    //   ),
    // },
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

          <Popconfirm
            title="Xác nhận xóa"
            description="Bạn chắc chắn muốn xóa dịch vụ này?"
            onConfirm={() => handleDelete(record)}
            okText="Xóa"
            cancelText="Hủy"
            okType="danger"
            placement="topRight"
          >
            <Tooltip title="Xóa">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                loading={deleteLoading === record.id}
                className="text-gray-500 hover:text-red-500 hover:bg-red-50"
              />
            </Tooltip>
          </Popconfirm>
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
        <h1 className="text-xl font-bold text-gray-800">Quản lý dịch vụ</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddService}
          className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 rounded-lg px-4 py-2 h-auto font-medium"
        >
          Thêm dịch vụ
        </Button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={data?.services || []}
          pagination={false}
          rowKey={(item: any) => item.id}
          className="bg-white rounded-lg"
          rowClassName="hover:bg-gray-50"
        />
      )}

      {/* Add/Edit Service Modal */}
      <Modal
        title={
          editingService ? (
            <h2 className="text-2xl font-bold mb-6 text-center">
              Chỉnh sửa dịch vụ
            </h2>
          ) : (
            <h2 className="text-2xl font-bold mb-6 text-center">
              Thêm dịch vụ mới
            </h2>
          )
        }
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={editingService ? "Lưu" : "Thêm"}
        cancelText="Hủy"
        width={600}
        okButtonProps={{
          className:
            "bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600",
        }}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            label={<span className="font-semibold">Tên dịch vụ</span>}
            name="serviceName"
            rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ!" }]}
          >
            <Input placeholder="Nhập tên dịch vụ" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={<span className="font-semibold">Giá</span>}
              name="price"
              rules={[
                { required: true, message: "Vui lòng nhập giá dịch vụ!" },
              ]}
            >
              <Input placeholder="VD: 200,000 - 500,000 VND" />
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold">Thời gian</span>}
              name="time"
              rules={[{ required: true, message: "Vui lòng nhập thời gian!" }]}
            >
              <Input placeholder="VD: 1 - 2 giờ" />
            </Form.Item>
          </div>

          <Form.Item
            label={<span className="font-semibold">Địa điểm</span>}
            name="location"
            rules={[{ required: true, message: "Vui lòng nhập địa điểm!" }]}
          >
            <Input placeholder="VD: Tại chỗ" />
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold">Mô tả</span>}
            name="description"
          >
            <Input.TextArea
              placeholder="Nhập mô tả dịch vụ (tùy chọn)"
              rows={3}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
