"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterData, LoginData } from "@/types";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Tabs,
  message,
  Col,
  Row,

} from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  LockOutlined,
  IdcardOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { login as loginApi, registerUser } from "@/lib/api/api";
import { useAuth } from "@/hooks/useAuth";
import { LoginResponse } from "@/types";

export default function LoginForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("login");
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (values: LoginData) => {
    setLoginLoading(true);
    try {
      const response: LoginResponse = await loginApi(values);

      if (response.success) {
        login(response);

        message.success(response.message || "Đăng nhập thành công!");

        if (response.userInfo.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        message.error("Đăng nhập thất bại!");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      message.error(error.message || "Đăng nhập thất bại!");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (values: RegisterData) => {
    setRegisterLoading(true);
    try {
      await registerUser(values);

      message.success("Đăng ký thành công!");
      registerForm.resetFields();
      setActiveTab("login");
    } catch (error: any) {
      console.error("Error:", error);
      message.error(error.message || "Đăng ký thất bại!");
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleForgotPassword = () => {
    message.info("Chức năng quên mật khẩu đang được phát triển");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-500 mb-2">LaptopFresh</h1>
          <p className="text-gray-600 text-sm">
            Dịch vụ công nghệ cho sinh viên FPTU
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-md p-8">

          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            centered
            className="mb-6"
            items={[
              {
                key: "login",
                label: "Đăng nhập",
                children: (
                  <div className="space-y-6 min-h-[600px]">
                    <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">
                      Đăng nhập tài khoản
                    </h2>

                    <Form
                      form={loginForm}
                      name="login"
                      onFinish={handleLogin}
                      layout="vertical"
                      requiredMark={false}
                    >
                      <Form.Item
                        label="Email / Tên đăng nhập"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message:
                              "Vui lòng nhập email hoặc tên đăng nhập!",
                          },
                        ]}
                      >
                        <Input
                          prefix={<MailOutlined className="text-gray-400" />}
                          placeholder="Nhập email hoặc tên đăng nhập"
                          size="large"
                          className="rounded-md"
                        />
                      </Form.Item>

                      <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập mật khẩu!",
                          },
                        ]}
                      >
                        <Input.Password
                          prefix={<LockOutlined className="text-gray-400" />}
                          placeholder="Nhập mật khẩu"
                          size="large"
                          className="rounded-md"
                          iconRender={(visible) =>
                            visible ? (
                              <EyeTwoTone />
                            ) : (
                              <EyeInvisibleOutlined />
                            )
                          }
                        />
                      </Form.Item>

                      <Form.Item name="remember" valuePropName="checked">
                        <Checkbox className="text-sm text-gray-600">
                          Ghi nhớ đăng nhập
                        </Checkbox>
                      </Form.Item>

                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          size="large"
                          loading={loginLoading}
                          className="w-full bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 rounded-md font-medium"
                        >
                          Đăng nhập
                        </Button>
                      </Form.Item>
                    </Form>

                    <div className="text-center space-y-3">
                      <p
                        onClick={handleForgotPassword}
                        className="text-blue-500 hover:text-blue-600 text-sm font-medium cursor-pointer"
                      >
                        Quên mật khẩu?
                      </p>

                      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                        Đăng nhập admin: Admin / 123456
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                key: "register",
                label: "Đăng ký",
                children: (
                  <div className="space-y-6 min-h-[600px]">
                    <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">
                      Tạo tài khoản mới
                    </h2>
                    <Form
                      form={registerForm}
                      name="register"
                      onFinish={handleRegister}
                      layout="vertical"
                      requiredMark={false}
                    >
                      <Form.Item
                        label="Họ và tên"
                        name="fullName"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập họ và tên!",
                          },
                          {
                            pattern: /^[a-zA-ZÀ-ỹ\s]+$/,
                            message: "Họ và tên chỉ chứa chữ!",
                          },
                        ]}
                      >
                        <Input
                          prefix={
                            <UserOutlined className="text-gray-400" />
                          }
                          placeholder="Nhập họ và tên"
                          size="large"
                          className="rounded-md"
                        />
                      </Form.Item>

                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập số điện thoại!",
                              },
                              {
                                pattern: /^[0-9]{10,11}$/,
                                message:
                                  "Số điện thoại phải có 10-11 chữ số!",
                              },
                            ]}
                          >
                            <Input
                              prefix={
                                <PhoneOutlined className="text-gray-400" />
                              }
                              placeholder="Nhập số điện thoại"
                              size="large"
                              className="rounded-md"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label="Mã số sinh viên"
                            name="studentId"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập MSSV!",
                              },
                              {
                                pattern: /^[A-Za-z0-9]+$/,
                                message:
                                  "Mã số sinh viên chỉ chứa chữ và số!",
                              },
                            ]}
                          >
                            <Input
                              prefix={
                                <IdcardOutlined className="text-gray-400" />
                              }
                              placeholder="Nhập MSSV"
                              size="large"
                              className="rounded-md"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập email!",
                          },
                          { type: "email", message: "Email không hợp lệ!" },
                        ]}
                      >
                        <Input
                          prefix={
                            <MailOutlined className="text-gray-400" />
                          }
                          placeholder="Nhập email"
                          size="large"
                          className="rounded-md"
                        />
                      </Form.Item>

                      <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập mật khẩu!",
                          },
                          {
                            min: 6,
                            message: "Mật khẩu phải có ít nhất 6 ký tự!",
                          },
                        ]}
                      >
                        <Input.Password
                          prefix={
                            <LockOutlined className="text-gray-400" />
                          }
                          placeholder="Nhập mật khẩu"
                          size="large"
                          className="rounded-md"
                          iconRender={(visible) =>
                            visible ? (
                              <EyeTwoTone />
                            ) : (
                              <EyeInvisibleOutlined />
                            )
                          }
                        />
                      </Form.Item>

                      <Form.Item
                        label="Xác nhận mật khẩu"
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng xác nhận mật khẩu!",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error("Mật khẩu xác nhận không khớp!")
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password
                          prefix={
                            <LockOutlined className="text-gray-400" />
                          }
                          placeholder="Nhập lại mật khẩu"
                          size="large"
                          className="rounded-md"
                          iconRender={(visible) =>
                            visible ? (
                              <EyeTwoTone />
                            ) : (
                              <EyeInvisibleOutlined />
                            )
                          }
                        />
                      </Form.Item>

                      <Form.Item>

                        <Button
                          type="primary"
                          htmlType="submit"
                          size="large"
                          loading={registerLoading}
                          className="w-full bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 rounded-md font-medium"
                        >
                          Đăng ký
                        </Button>

                      </Form.Item>
                    </Form>

                  </div>
                ),
              },
            ]}
          />

        </div>
      </div>
    </div>
  );
}
