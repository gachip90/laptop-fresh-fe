"use client";

import { fetcher } from "@/lib/api/api";
import useSWR from "swr";
import { useAuth } from "@/hooks/useAuth";

import {
  Badge,
  Button,
  Card,
  List,
  Spin,
  Typography,
  Modal,
  message,
} from "antd";
import {
  ToolOutlined,
  RocketOutlined,
  LaptopOutlined,
  SettingOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

import { JSX } from "react";

import type { Service } from "@/types";
import { useState } from "react";
import { BookingForm } from "../form/booking-form";

export function MainSection() {
  const { isLoggedIn } = useAuth();
  const { data, error, isLoading } = useSWR("/services/getAll", fetcher);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  // Mapping service names to form values
  const serviceTypeMapping: { [key: string]: string } = {
    "Bảo dưỡng & Vệ sinh Laptop": "maintenance",
    "Nâng cấp Phần cứng": "upgrade",
    "Cho thuê Thiết bị": "rent",
    "Cài đặt & Hỗ trợ Phần mềm": "install",
  };

  const handleBookingClick = (serviceName: string) => {
    setSelectedService(serviceName);
    if (!isLoggedIn) {
      message.info("Vui lòng đăng nhập để đặt lịch!");
      return;
    } else {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedService("");
  };

  // Icon mapping based on service names
  const iconMap: { [key: string]: JSX.Element } = {
    "Bảo dưỡng & Vệ sinh Laptop": (
      <ToolOutlined className="text-3xl !text-blue-500" />
    ),
    "Nâng cấp Phần cứng": (
      <RocketOutlined className="text-3xl !text-blue-500" />
    ),
    "Cho thuê Thiết bị": <LaptopOutlined className="text-3xl !text-blue-500" />,
    "Cài đặt & Hỗ trợ Phần mềm": (
      <SettingOutlined className="text-3xl !text-blue-500" />
    ),
  };

  // Default icon for services without specific mapping
  const defaultIcon = <SettingOutlined className="text-3xl !text-blue-500" />;

  // Map API data to include icons and popular flag
  const servicesWithIcons = data?.services
    ? data.services.map((service: Service) => ({
        ...service,
        icon: iconMap[service.serviceName] || defaultIcon,
        popular: service.serviceName === "Nâng cấp Phần cứng", // Set popular service
      }))
    : [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div>Lỗi khi tải dữ liệu: {error.message}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {servicesWithIcons.map((service: any, index: number) => (
          <div key={service.id || index}>
            {service.popular ? (
              <Badge.Ribbon text="Phổ biến" color="blue">
                <Card className="hover:shadow-lg transition-shadow">
                  <div className="flex">
                    <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mr-4">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {service.serviceName}
                      </h3>
                      <p className="text-base text-gray-600">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between my-4">
                    <div className="flex gap-16">
                      <div>
                        <p className="text-gray-500">Giá dịch vụ:</p>
                        <p className="text-blue-600 text-lg font-medium">
                          {service.price}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Thời gian:</p>
                        <p className="text-lg font-semibold">{service.time}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500">Địa điểm:</p>
                      <p className="text-lg font-semibold">
                        {service.location}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold mb-2">Những gì bạn nhận được:</p>
                  <List
                    dataSource={service.features || []}
                    renderItem={(feature: string) => (
                      <List.Item className="py-1">
                        <div className="flex items-start">
                          <CheckCircleFilled
                            style={{
                              color: "#52c41a",
                              marginRight: "8px",
                              marginTop: "2px",
                            }}
                          />
                          <Typography.Text>{feature}</Typography.Text>
                        </div>
                      </List.Item>
                    )}
                    className="mb-4"
                  />

                  <Button
                    type="primary"
                    className="bg-blue-500 hover:bg-blue-600 w-full mt-4"
                    onClick={() => handleBookingClick(service.serviceName)}
                  >
                    Đặt lịch ngay
                  </Button>
                </Card>
              </Badge.Ribbon>
            ) : (
              <Card className="hover:shadow-lg transition-shadow">
                <div className="flex">
                  <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mr-4">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {service.serviceName}
                    </h3>
                    <p className="text-base text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between my-4">
                  <div className="flex gap-16">
                    <div>
                      <p className="text-gray-500">Giá dịch vụ:</p>
                      <p className="text-blue-600 text-lg font-medium">
                        {service.price}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Thời gian:</p>
                      <p className="text-lg font-semibold">{service.time}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500">Địa điểm:</p>
                    <p className="text-lg font-semibold">{service.location}</p>
                  </div>
                </div>

                <p className="font-semibold mb-2">Những gì bạn nhận được:</p>
                <List
                  dataSource={service.features || []}
                  renderItem={(feature: string) => (
                    <List.Item className="py-1">
                      <div className="flex items-start">
                        <CheckCircleFilled
                          style={{
                            color: "#52c41a",
                            marginRight: "8px",
                            marginTop: "2px",
                          }}
                        />
                        <Typography.Text>{feature}</Typography.Text>
                      </div>
                    </List.Item>
                  )}
                  className="mb-4"
                />

                <Button
                  type="primary"
                  className="bg-blue-500 hover:bg-blue-600 mt-4 w-full"
                  onClick={() => handleBookingClick(service.serviceName)}
                >
                  Đặt lịch ngay
                </Button>
              </Card>
            )}
          </div>
        ))}
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={800}
        centered
      >
        <BookingForm
          selectedServiceType={selectedService}
          onSuccess={handleModalClose}
        />
      </Modal>
    </div>
  );
}
