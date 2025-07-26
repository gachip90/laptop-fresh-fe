import "@ant-design/v5-patch-for-react-19";

import type { Metadata } from "next";
import { ConfigProvider, App } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./style/globals.css";

export const metadata: Metadata = {
  title: "Laptop Fresh",
  description: "Website đặt lịch sửa chữa và nâng cấp laptop",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="vi">
      <body>

        <AntdRegistry hashPriority="low">
          <App>
            <ConfigProvider
              theme={{
                token: {
                  borderRadius: 8,
                  fontFamily: "var(--font-geist-sans)",
                },
              }}
            >
              <main className="min-h-screen">{children}</main>
            </ConfigProvider>
          </App>
        </AntdRegistry>
      </body>
    </html>
  );
}
