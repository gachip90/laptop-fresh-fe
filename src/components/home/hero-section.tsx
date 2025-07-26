"use client";

import { Button } from "antd";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="bg-gray-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-500 mb-6 leading-tight">
            Laptop Tươi Mới, Học Tập Hết Ý
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            LaptopFresh cung cấp dịch vụ công nghệ toàn diện, nhanh chóng và
            <br className="hidden sm:block" />
            tin cậy dành riêng cho sinh viên Đại học FPT TP.HCM.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/booking">
              <Button
                color="blue"
                variant="solid"
                size="large"
                className="rounded-lg px-8 h-12 text-base font-semibold min-w-[160px] shadow-md hover:shadow-lg transition-all duration-200"
              >
                Đặt lịch ngay
              </Button>
            </Link>

            <Link href="/service">
              <Button
                type="default"
                size="large"
                className="rounded-lg px-8 h-12 text-base font-semibold min-w-[160px] hover:shadow-md transition-all duration-200"
              >
                Xem dịch vụ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
