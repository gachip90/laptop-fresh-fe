"use client";

import { Card, Col, Row } from "antd";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";

const services = [
  {
    icon: <ClockCircleOutlined className="text-4xl !text-blue-500 " />,
    title: "Nhanh chóng",
    description: "Hoàn thành trong ngày, không làm gián đoạn học tập",
  },
  {
    icon: <EnvironmentOutlined className="text-4xl !text-blue-500" />,
    title: "Tiện lợi",
    description: "Dịch vụ tại chỗ, giao nhận tận nơi trong khuôn viên trường",
  },
  {
    icon: <CheckCircleOutlined className="text-4xl !text-blue-500" />,
    title: "Uy tín",
    description: "Đội ngũ kỹ thuật viên có kinh nghiệm, bảo hành dài hạn",
  },
  {
    icon: <StarOutlined className="text-4xl !text-blue-500" />,
    title: "Giá ưu đãi",
    description: "Giá đặc biệt cho sinh viên FPTU, nhiều gói combo tiết kiệm",
  },
];

export function InfoSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-4">
            Dịch vụ của chúng tôi
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Giải pháp công nghệ toàn diện dành riêng cho sinh viên FPTU TP.HCM
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
