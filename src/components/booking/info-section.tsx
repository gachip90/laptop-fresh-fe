"use client";

import { Card, Col, Row } from "antd";
import {
  ToolOutlined,
  RocketOutlined,
  LaptopOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const services = [
  {
    icon: <LaptopOutlined className="text-4xl !text-blue-500 " />,
    title: "Cho thuê thiết bị",
    description: "Thuê laptop, chuột, bàn phím, sạc, và các phụ kiện khác",
  },
  {
    icon: <ToolOutlined className="text-4xl !text-blue-500" />,
    title: "Bảo dưỡng & Vệ sinh",
    description: "Vệ sinh, kiểm tra nhiệt độ, thay keo tản nhiệt",
  },
  {
    icon: <RocketOutlined className="text-4xl !text-blue-500" />,
    title: "Nâng cấp phần cứng",
    description: "Nâng cấp RAM, SSD, ổ cứng",
  },
  {
    icon: <SettingOutlined className="text-4xl !text-blue-500" />,
    title: "Cài đặt phần mềm",
    description: "Cài đặt phần mềm chuyên ngành, hệ điều hành",
  },
];

export function InfoSection() {
  return (
    <section className="py-20 bg-white">
      <div>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-4">
            Đặt lịch dịch vụ
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chọn dịch vụ phù hợp và đặt lịch thuận tiện cho bạn
          </p>
        </div>

        {/* Services Grid */}
        <Row gutter={[32, 32]}>
          {services.map((service, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card
                className="h-full text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl hover:-translate-y-1"
                styles={{ body: { padding: "32px 24px" } }}
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                      {service.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
