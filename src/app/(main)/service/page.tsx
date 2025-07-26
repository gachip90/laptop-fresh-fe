"use client";

import { Button } from "antd";
import { InfoSection } from "@/components/services/info-section";
import { MainSection } from "@/components/services/main-section";

export default function ServicesPage() {
  return (
    <div className="my-4">
      <InfoSection />
      <MainSection />
      <div className="text-center mt-8">
        <div className="bg-blue-500 text-white p-12 rounded-lg flex flex-col items-center justify-between">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Cần tư vấn thêm?</h2>
            <p className="text-xl mb-4">
              Đội ngũ nhân viên của chúng tôi sẵn sàng hỗ trợ bạn 24/7
            </p>
          </div>
          <div className="flex gap-x-4 mt-2">
            <Button
              type="default"
              size="large"
              className="border-white text-white hover:bg-gray-700"
            >
              Đặt lịch tư vấn
            </Button>
            <Button
              type="default"
              size="large"
              className="border-white text-white hover:bg-gray-700"
            >
              Gọi ngay: 1800 1234
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
