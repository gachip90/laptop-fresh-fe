"use client";

import Link from "next/link";
import { Row, Col, Typography } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Row gutter={[48, 32]}>
          {/* Company Info */}
          <Col xs={24} sm={24} md={8}>
            <div className="space-y-4">
              <Title level={4} className="!text-gray-900 !mb-4 !font-bold">
                LaptopFresh
              </Title>
              <Text className="text-gray-600 leading-relaxed block">
                Hỗ trợ sinh viên FPTU TP.HCM với các dịch vụ công nghệ tốt nhất.
              </Text>
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} md={8}>
            <div className="space-y-4">
              <Title level={4} className="!text-gray-900 !mb-4 !font-bold">
                Liên kết nhanh
              </Title>
              <div className="space-y-3">
                <div>
                  <Link
                    href="/services"
                    className="!text-gray-600 hover:!text-blue-500 transition-colors duration-200 block"
                  >
                    Dịch vụ
                  </Link>
                </div>
                <div>
                  <Link
                    href="/booking"
                    className="!text-gray-600 hover:!text-blue-500 transition-colors duration-200 block"
                  >
                    Đặt lịch
                  </Link>
                </div>
                <div>
                  <Link
                    href="/products"
                    className="!text-gray-600 hover:!text-blue-500 transition-colors duration-200 block"
                  >
                    Sản phẩm
                  </Link>
                </div>
                <div>
                  <Link
                    href="/news"
                    className="!text-gray-600 hover:!text-blue-500 transition-colors duration-200 block"
                  >
                    Tin tức
                  </Link>
                </div>
              </div>
            </div>
          </Col>

          {/* Contact Info */}
          <Col xs={24} sm={12} md={8}>
            <div className="space-y-4">
              <Title level={4} className="!text-gray-900 !mb-4 !font-bold">
                Liên hệ
              </Title>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MailOutlined className="hover:!text-blue-500 text-base" />
                  <Text>
                    <a href="mailto:support@laptopfresh.com">
                      <span className="!text-gray-600 hover:!text-blue-500 transition-colors duration-200">
                        support@laptopfresh.com
                      </span>
                    </a>
                  </Text>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneOutlined className="hover:!text-blue-500 text-base" />
                  <Text className="text-gray-600">
                    <a
                      href="tel:18001234"
                      className="hover:text-blue-500 transition-colors duration-200"
                    >
                      <span className="!text-gray-600 hover:!text-blue-500 transition-colors duration-200">
                        1800 1234
                      </span>
                    </a>
                  </Text>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="text-center">
            <Text className="text-gray-500 text-sm">
              © 2025 LaptopFresh. Tất cả quyền được bảo lưu.
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
}
