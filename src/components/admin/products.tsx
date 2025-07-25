"use client";

import {
  Table,
  Button,
  Space,
  Tooltip,
  Modal,
  Form,
  Input,
  Select,
  message,
  Spin,
  Popconfirm,
  Upload,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import {
  fetcher,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/api/api";
import useSWR from "swr";
import type { Product } from "@/types";

const { Option } = Select;

export default function AdminProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();
  const [imageFileList, setImageFileList] = useState<any[]>([]); // Quản lý file ảnh

  const { data, error, isLoading, mutate } = useSWR(
    "/products/getAll",
    fetcher
  );

  const handleEdit = (record: Product) => {
    setEditingProduct(record);
    form.setFieldsValue({
      productName: record.productName,
      category: record.category,
      originalPrice: record.originalPrice,
      discount: record.discount,
    });

    if ((record as any).image) {
      setImageFileList([
        {
          uid: '-1',
          name: 'Ảnh hiện tại',
          status: 'done',
          url: (record as any).image,
        },
      ]);
    } else {
      setImageFileList([]);
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (record: Product) => {
    try {
      setDeleteLoading(record.id);
      await deleteProduct(record.id);
      message.success("Xóa sản phẩm thành công!");
      mutate();
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa sản phẩm!");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    form.resetFields();
    setImageFileList([]);
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          setLoading(true);
          let imageBase64 = '';
          if (imageFileList.length > 0) {
            imageBase64 = imageFileList[0].url || '';
          }
          const submitData = {
            ...values,
            image: imageBase64,
          };
          if (editingProduct) {
            await updateProduct(editingProduct.id, submitData);
            message.success("Cập nhật sản phẩm thành công!");
          } else {
            await createProduct(submitData);
            message.success("Thêm sản phẩm thành công!");
          }
          setIsModalOpen(false);
          form.resetFields();
          setEditingProduct(null);
          setImageFileList([]);
          mutate();
        } catch (error) {
          message.error("Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
          setLoading(false);
        }
      })
      .catch(() => { });
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingProduct(null);
  };

  const columns: ColumnsType<Product> = [
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      key: "productName",
      className: "text-gray-700 font-semibold",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      className: "text-gray-600",
      render: (category: string) => {
        const categoryMapping: { [key: string]: string } = {
          mouse: "Chuột",
          keyboard: "Bàn phím",
          monitor: "Màn hình",
          ssd: "Ổ cứng SSD",
          ram: "RAM",
          cpu: "CPU",
          gpu: "Card đồ họa",
          motherboard: "Bo mạch chủ",
          psu: "Nguồn máy tính",
          case: "Vỏ máy tính",
          cooling: "Tản nhiệt",
        };
        return categoryMapping[category] || category;
      },
    },
    {
      title: "Giá gốc",
      dataIndex: "originalPrice",
      key: "originalPrice",
      className: "text-gray-600",
      render: (value: number) =>
        value ? value.toLocaleString("vi-VN").replace(/,/g, ".") + "₫" : "0₫",
    },
    {
      title: "Khuyến mãi (%)",
      dataIndex: "discount",
      key: "discount",
      className: "text-gray-600",
      render: (value: number) => (value ? value + "%" : "0%"),
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
          <Popconfirm
            title="Xác nhận xóa"
            description="Bạn chắc chắn muốn xóa sản phẩm này?"
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

  const product_categories = [
    { value: "mouse", label: "Chuột" },
    { value: "keyboard", label: "Bàn phím" },
    { value: "monitor", label: "Màn hình" },
    { value: "ssd", label: "Ổ cứng SSD" },
    { value: "ram", label: "RAM" },
  ];

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Quản lý sản phẩm</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddProduct}
          className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 rounded-lg px-4 py-2 h-auto font-medium"
        >
          Thêm sản phẩm
        </Button>
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
          dataSource={data?.products || []}
          pagination={false}
          rowKey={(item: any) => item.id}
          className="bg-white rounded-lg"
          rowClassName="hover:bg-gray-50"
        />
      )}
      <Modal
        title={
          editingProduct ? (
            <h2 className="text-2xl font-bold mb-6 text-center">
              Chỉnh sửa sản phẩm
            </h2>
          ) : (
            <h2 className="text-2xl font-bold mb-6 text-center">
              Thêm sản phẩm mới
            </h2>
          )
        }
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={editingProduct ? "Lưu" : "Thêm"}
        cancelText="Hủy"
        width={600}
        okButtonProps={{
          className:
            "bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600",
        }}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            label={<span className="font-semibold">Tên sản phẩm</span>}
            name="productName"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>
          <Form.Item
            label={<span className="font-semibold">Danh mục</span>}
            name="category"
            rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
          >
            <Select placeholder="Chọn danh mục">
              {product_categories.map((cat) => (
                <Option key={cat.value} value={cat.value}>
                  {cat.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={<span className="font-semibold">Ảnh sản phẩm</span>}
            required={false}
          >
            <Upload
              listType="picture"
              fileList={imageFileList}
              beforeUpload={file => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  setImageFileList([
                    {
                      uid: file.uid,
                      name: file.name,
                      status: "done",
                      url: reader.result as string,
                      originFileObj: file,
                    },
                  ]);
                };
                return false;
              }}
              onRemove={() => {
                setImageFileList([]);
              }}
              maxCount={1}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={<span className="font-semibold">Giá gốc</span>}
              name="originalPrice"
              rules={[{ required: true, message: "Vui lòng nhập giá gốc!" }]}
            >
              <Input placeholder="VD: 1.000.000" />
            </Form.Item>
            <Form.Item
              label={<span className="font-semibold">Khuyến mãi (%)</span>}
              name="discount"
              rules={[{ required: true, message: "Vui lòng nhập khuyến mãi!" }]}
            >
              <Input placeholder="VD: 10" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
