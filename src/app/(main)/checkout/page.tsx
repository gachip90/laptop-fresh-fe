"use client";

import { useState, Suspense } from "react";
import useSWR from "swr";
import { Button, Radio, message, Card, Modal, Form, Input, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { createOrderProduct, fetcher } from "@/lib/api/api";
import { useAuth } from "@/hooks/useAuth";

function CheckoutContent() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const { user } = useAuth();

  const { data, error, isLoading } = useSWR(
    productId ? `/products/get/${productId}` : null,
    fetcher
  );
  const product = data?.product;

  const handleCheckout = () => {
    setModalOpen(true);
  };

  const handleOrder = async () => {
    try {
      setLoading(true);
      const receiver = await form.validateFields();
      await createOrderProduct({
        productName: product?.productName,
        customerName: receiver.customerName,
        email: receiver.email,
        phone: receiver.phone,
        address: receiver.address,
        totalPrice: product?.price,
        userId: user?.userId,
      });
      setModalOpen(false);
      message.success(
        "Đặt hàng thành công! Đơn hàng sẽ được giao và thanh toán khi nhận hàng."
      );
      router.push("/product");
    } catch (err) {
      message.error("Vui lòng nhập đầy đủ thông tin người nhận!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Thanh toán đơn hàng
      </h1>
      <div className="mb-6">
        <Card>
          <h2 className="font-semibold mb-2">Thông tin đơn hàng</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Spin size="small" />
            </div>
          ) : error || !product ? (
            <div className="text-center text-red-500 py-8">
              Không tìm thấy sản phẩm.
            </div>
          ) : (
            <ul className="mb-2">
              <li className="flex justify-between py-1">
                <span>{product.productName}</span>
                <span>{product.price?.toLocaleString()}₫</span>
              </li>
            </ul>
          )}
          <div className="flex justify-between font-semibold border-t pt-2">
            <span>Tổng tiền:</span>
            <span className="text-blue-600">
              {product?.price
                ? product.price
                  .toLocaleString("vi-VN", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
                  .replace(/,/g, ".")
                : 0}
              ₫
            </span>
          </div>
        </Card>
      </div>
      <div className="mb-6">
        <Card>
          <h2 className="font-semibold mb-2">Phương thức thanh toán</h2>
          <Radio.Group
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <Radio value="cod">Thanh toán khi nhận hàng (COD)</Radio>
          </Radio.Group>
        </Card>
      </div>
      <Button
        type="primary"
        block
        size="large"
        onClick={handleCheckout}
        className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
        disabled={!product}
      >
        Xác nhận đặt hàng
      </Button>
      <Modal
        title="Thông tin người nhận hàng"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleOrder}>
          <Form.Item
            label="Họ và tên"
            name="customerName"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input />
          </Form.Item>
          <div className="flex gap-2 justify-end mt-4">
            <Button onClick={() => setModalOpen(false)}>Quay lại</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
            >
              Xác nhận
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto py-10 px-4">
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
