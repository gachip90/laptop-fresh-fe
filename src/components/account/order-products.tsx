"use client";

import { fetcher } from "@/lib/api/api";
import { Button, Card, App, message } from "antd";
import { useAuth } from "@/hooks/useAuth";
import useSWR from "swr";
import {
    InfoCircleOutlined,
} from "@ant-design/icons";


export default function AccountOrderProducts() {
    const { user } = useAuth();
    const { data, error, isLoading, mutate } = useSWR(
        `/orders/products/get/${user?.userId}`,
        fetcher
    );

    return (
        <div className="mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                    Lịch sử đặt hàng
                </h3>
                <span className="text-gray-600">Tổng: {data?.orderProducts?.length || 0} đơn</span>
            </div>

            {(!data?.orderProducts || data.orderProducts.length === 0) ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <InfoCircleOutlined style={{ fontSize: 48, color: '#aaa' }} />
                    <div className="mt-4 text-lg text-gray-600">Bạn chưa có đơn đặt hàng nào</div>
                    <Button
                        type="primary"
                        className="mt-6 bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
                        href="/products"
                    >
                        Mua sản phẩm ngay
                    </Button>
                </div>
            ) : (
                <div className="space-y-6">
                    {data.orderProducts.map((order: any) => (
                        <div key={order.id} className="mb-6">
                            <Card className="shadow border rounded-2xl p-0">

                                <h4 className="text-base font-semibold text-gray-800 mb-2 text-center">
                                    {order.productName}
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                                    <div className="text-gray-600 text-center md:text-left">
                                        <span className="font-medium">Khách hàng:</span> {order.customerName}
                                    </div>
                                    <div className="text-gray-600 text-center md:text-left">
                                        <span className="font-medium">SĐT:</span> {order.phone}
                                    </div>
                                    <div className="text-gray-600 text-center md:text-left">
                                        <span className="font-medium">Email:</span> {order.email}
                                    </div>
                                    <div className="text-gray-600 text-center md:text-left">
                                        <span className="font-medium">Địa chỉ:</span> {order.address}
                                    </div>
                                    <div className="text-gray-600 text-center md:text-left">
                                        <span className="text-md font-bold text-orange-500 text-center">
                                            Tổng tiền: {Number(order.totalPrice).toLocaleString("vi-VN").replace(/,/g, ".")}₫
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 