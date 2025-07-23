"use client";

import { Row, Col, Card } from "antd";
import {
  ToolOutlined,
  RocketOutlined,
  LaptopOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const services = [
  {
    icon: <ToolOutlined className="text-4xl !text-blue-500" />,
    title: "Bảo dưỡng & Vệ sinh",
    description:
      "Giúp laptop của bạn luôn sạch sẽ, mát mẻ và hoạt động tối ưu nhất.",
  },
  {
    icon: <RocketOutlined className="text-4xl !text-blue-500" />,
    title: "Nâng cấp phần cứng",
    description:
      "Tăng tốc độ với RAM, SSD mới, nâng cấp hiệu suất làm việc và học tập.",
  },
  {
    icon: <LaptopOutlined className="text-4xl !text-blue-500" />,
    title: "Cho thuê thiết bị",
    description:
      "Cần laptop, chuột, bàn phím gấp? Chúng tôi có sẵn thiết bị cho thuê.",
  },
  {
    icon: <SettingOutlined className="text-4xl !text-blue-500" />,
    title: "Cài đặt & Hỗ trợ",
    description:
      "Cài đặt phần mềm chuyên ngành, hỗ trợ sự cố kỹ thuật nhanh chóng.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-4">
            Dịch vụ nổi bật
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mọi nhu cầu về thiết bị công nghệ của bạn đều được đáp ứng tại một
            nơi.
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
