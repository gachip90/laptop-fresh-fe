"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button, Drawer, Avatar, Dropdown, Tooltip } from "antd";
import { MenuOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

export function Header() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Base menu items
  const baseMenuItems = [
    { key: "/", label: "Trang chủ", href: "/" },
    { key: "/services", label: "Dịch vụ", href: "/services" },
    { key: "/booking", label: "Đặt lịch", href: "/booking" },
    { key: "/products", label: "Sản phẩm", href: "/products" },
    { key: "/blogs", label: "Bài viết", href: "/blogs" },
  ];

  // Dynamic menu items based on user role
  const getMenuItems = () => {
    if (!isLoggedIn || !user) {
      return baseMenuItems;
    }
    const roleBasedItem =
      user.role === "admin"
        ? { key: "/admin", label: "Quản trị", href: "/admin" }
        : { key: "/account", label: "Tài khoản", href: "/account" };

    return [...baseMenuItems, roleBasedItem];
  };

  const menuItems = getMenuItems();

  // User dropdown menu
  const userDropdownItems: MenuProps["items"] = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: (
        <span onClick={handleLogout} className="block">
          Đăng xuất
        </span>
      ),
    },
  ];

  // User Avatar Component
  const UserAvatar = ({ isMobile = false }) => (
    <Dropdown
      menu={{ items: userDropdownItems }}
      placement="bottomRight"
      trigger={["click"]}
    >
      <div
        className={`flex items-center space-x-2 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors ${
          isMobile ? "w-full justify-start" : ""
        }`}
      >
        <Tooltip>
          <Avatar
            size={32}
            icon={<UserOutlined />}
            className="border-2 border-blue-100"
          />
        </Tooltip>
        <div className={`${isMobile ? "block" : "hidden lg:block"} px-2`}>
          <span className="text-sm text-gray-600">Xin chào,</span>
          <div className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
            {user?.fullName}
          </div>
        </div>
      </div>
    </Dropdown>
  );

  // Desktop Navigation Menu
  const DesktopMenu = () => (
    <nav className="hidden md:flex items-center space-x-8">
      {menuItems.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          className={`text-gray-700 hover:text-blue-500 transition-colors duration-200 font-medium ${
            pathname === item.key ? "text-blue-500" : ""
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );

  // Mobile Navigation Menu
  const MobileMenu = () => (
    <div className="flex flex-col space-y-4">
      {menuItems.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          className={`text-gray-700 hover:text-blue-500 transition-colors duration-200 font-medium py-2 ${
            pathname === item.key ? "text-blue-500 font-semibold" : ""
          }`}
          onClick={() => setDrawerVisible(false)}
        >
          {item.label}
        </Link>
      ))}

      {/* Mobile User Section */}
      <div className="pt-4 border-t border-gray-200">
        {isLoggedIn ? (
          <UserAvatar isMobile={true} />
        ) : (
          <Link href="/login">
            <Button
              color="blue"
              variant="solid"
              block
              className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 rounded-lg h-10 font-semibold"
              onClick={() => setDrawerVisible(false)}
            >
              Đăng nhập
            </Button>
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo_fptu.png"
              alt="FPT University"
              width={120}
              height={50}
              className="w-auto h-16"
              priority
            />
          </Link>

          {/* Desktop Navigation & Auth Section */}
          <div className="hidden md:flex items-center space-x-8">
            <DesktopMenu />

            {/* Desktop Auth Section */}
            {isLoggedIn ? (
              <UserAvatar />
            ) : (
              <Link href="/login">
                <Button
                  color="blue"
                  variant="solid"
                  size="large"
                  className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 rounded-lg px-6 h-10 font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Đăng nhập
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              type="primary"
              icon={<MenuOutlined className="text-lg" />}
              onClick={() => setDrawerVisible(true)}
              className="text-gray-700 hover:text-blue-500 hover:bg-blue-50 border-0 w-10 h-10 flex items-center justify-center"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center">
            <Image
              src="/logo_fptu.png"
              alt="FPT University"
              width={120}
              height={24}
              className="h-6 w-auto"
            />
          </div>
        }
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={300}
        className="mobile-menu-drawer"
      >
        <MobileMenu />
      </Drawer>
    </header>
  );
}
