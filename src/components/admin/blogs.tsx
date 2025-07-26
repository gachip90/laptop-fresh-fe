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
import { fetcher, createBlog, updateBlog, deleteBlog } from "@/lib/api/api";
import useSWR from "swr";
import type { Blog, BlogData } from "@/types";

// const { confirm } = Modal;
const { Option } = Select;

export default function Blogs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogData | null>(null);
  const [form] = Form.useForm();
  const [imageFileList, setImageFileList] = useState<any[]>([]); // Quản lý file ảnh

  const { data, error, isLoading, mutate } = useSWR("/blogs/getAll", fetcher);

  const handleEdit = (record: BlogData) => {
    setEditingBlog(record);
    const formData: Blog = {
      title: record.title,
      description: record.description,
      image: (record as any).image || '',
      category: record.category,
      author: record.author,
      publishedDate: record.publishedDate,
      content: record.content,
    };
    form.setFieldsValue(formData);

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

  const handleDelete = async (record: BlogData) => {
    try {
      setDeleteLoading(record.id!);
      await deleteBlog(record.id!);
      message.success("Xóa bài viết thành công!");
      mutate();
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error);
      message.error("Có lỗi xảy ra khi xóa bài viết!");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleAddBlog = () => {
    setEditingBlog(null);
    form.resetFields();
    setImageFileList([]);
    setIsModalOpen(true);
  };


  const handleImageChange = async ({ fileList }: any) => {
    if (fileList.length > 0 && fileList[0].originFileObj) {
      const file = fileList[0].originFileObj;
      const toBase64 = (file: File) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
        });
      const base64 = await toBase64(file);
      setImageFileList([
        {
          ...fileList[0],
          url: base64,
        },
      ]);
    } else {
      setImageFileList(fileList);
    }
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          setLoading(true);
          let imageBase64 = '1';
          if (imageFileList.length > 0) {
            imageBase64 = imageFileList[0].url || '';
          }
          const submitData = {
            ...values,
            image: imageBase64,
          };
          console.log("submitData:", submitData);
          if (editingBlog) {
            await updateBlog(editingBlog.id!, submitData);
            message.success("Cập nhật bài viết thành công!");
          } else {
            await createBlog(submitData);
            message.success("Thêm bài viết thành công!");
          }
          setIsModalOpen(false);
          form.resetFields();
          setEditingBlog(null);
          setImageFileList([]);
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
    setEditingBlog(null);
  };

  const columns: ColumnsType<BlogData> = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
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
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      className: "text-gray-600",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
      className: "text-gray-600",
    },
    {
      title: "Ngày tạo",
      dataIndex: "publishedDate",
      key: "publishedDate",
      className: "text-gray-600",
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
            description="Bạn chắc chắn muốn xóa bài viết này?"
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

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Quản lý bài viết</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddBlog}
          className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 rounded-lg px-4 py-2 h-auto font-medium"
        >
          Thêm bài viết
        </Button>
      </div>

      {/* Table */}
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
          dataSource={data?.blogs || []}
          pagination={false}
          rowKey={(item: any) => item.id}
          className="bg-white rounded-lg"
          rowClassName="hover:bg-gray-50"
        />
      )}

      {/* Add/Edit Blog Modal */}
      <Modal
        title={
          editingBlog ? (
            <h2 className="text-2xl font-bold mb-6 text-center">
              Chỉnh sửa bài viết
            </h2>
          ) : (
            <h2 className="text-2xl font-bold mb-6 text-center">
              Thêm bài viết mới
            </h2>
          )
        }
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={editingBlog ? "Lưu" : "Thêm"}
        cancelText="Hủy"
        width={600}
        okButtonProps={{
          className:
            "bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600",
        }}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            label={<span className="font-semibold">Tiêu đề</span>}
            name="title"
            rules={[
              { required: true, message: "Vui lòng nhập tiêu đề bài viết!" },
            ]}
          >
            <Input placeholder="Nhập tiêu đề" />
          </Form.Item>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={<span className="font-semibold">Ảnh bài viết</span>}
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

            <Form.Item
              label={<span className="font-semibold">Danh mục</span>}
              name="category"
              rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
            >
              <Select placeholder="Chọn danh mục">
                <Option value="Khuyến mãi">Khuyến mãi</Option>
                <Option value="Bảo dưỡng">Bảo dưỡng</Option>
                <Option value="Mẹo vặt">Mẹo vặt</Option>
                <Option value="Nâng cấp">Nâng cấp</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={<span className="font-semibold">Tác giả</span>}
              name="author"
              rules={[
                { required: true, message: "Vui lòng nhập tên tác giả!" },
              ]}
            >
              <Input placeholder="VD: Team LaptopFresh" />
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold">Ngày tạo</span>}
              name="publishedDate"
              rules={[{ required: true, message: "Vui lòng nhập thời gian!" }]}
            >
              <Input placeholder="VD: 21 tháng 7, 2025" />
            </Form.Item>
          </div>



          <Form.Item
            label={<span className="font-semibold">Mô tả</span>}
            name="description"
          >
            <Input.TextArea
              placeholder="Nhập mô tả bài viết (tùy chọn)"
              rows={2}
            />
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold">Nội dung bài viết</span>}
            name="content"
            rules={[{ required: true, message: "Vui lòng nhập nội dung bài viết!" }]}
          >
            <Input.TextArea
              placeholder="Nhập nội dung bài viết"
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
