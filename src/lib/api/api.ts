import {
  BlogData,
  FeedbackData,
  LoginData,
  OrderProductData,
  OrderServiceData,
  ProductData,
  RegisterData,
  ServiceData,
  UserData,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const fetcher = async (url: string, options?: RequestInit) => {
  const response = await fetch(`${API_URL}${url}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Lỗi khi gọi API");
  }

  return data;
};

export const registerUser = async (userData: RegisterData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message || "Đăng ký thất bại!");
  }

  return data;
};

export const login = async (userData: LoginData) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message || "Đăng nhập thất bại!");
  }

  return data;
};

export const createOrderService = async (
  orderServiceData: OrderServiceData
) => {
  const res = await fetch(`${API_URL}/orders/services/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderServiceData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message || "Đặt lịch thành công!");
  }

  return data;
};

export const cancelOrderService = async (orderId: string) => {
  const res = await fetch(`${API_URL}/orders/services/cancel/${orderId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message || "Hủy đặt lịch thành công!");
  }

  return data;
};

export const updateUser = async (id: string, userData: UserData) => {
  const res = await fetch(`${API_URL}/users/update/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message || "Cập nhật thông tin người dùng thành công!");
  }

  return data;
};

export const createFeedback = async (feedbackData: FeedbackData) => {
  const res = await fetch(`${API_URL}/feedbacks/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedbackData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message || "Gửi phản hồi thành công!");
  }

  return data;
};

export const createService = async (serviceData: ServiceData) => {
  const res = await fetch(`${API_URL}/services/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serviceData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message || "Thêm dịch vụ thành công!");
  }

  return data;
};

export const updateService = async (id: string, serviceData: ServiceData) => {
  const res = await fetch(`${API_URL}/services/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serviceData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message || "Cập nhật dịch vụ thành công!");
  }

  return data;
};

export const deleteService = async (id: string) => {
  const res = await fetch(`${API_URL}/services/delete/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message || "Xóa dịch vụ thành công!");
  }

  return data;
};

export const createBlog = async (blogData: BlogData) => {
  const res = await fetch(`${API_URL}/blogs/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message || "Thêm bài viết thành công!");
  }

  return data;
};

export const updateBlog = async (id: string, blogData: BlogData) => {
  const res = await fetch(`${API_URL}/blogs/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message || "Cập nhật bài viết thành công!");
  }

  return data;
};

export const deleteBlog = async (id: string) => {
  const res = await fetch(`${API_URL}/blogs/delete/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message || "Xóa bài viết thành công!");
  }

  return data;
};

export const updateOrderService = async (
  id: string,
  orderServiceData: OrderServiceData
) => {
  const res = await fetch(`${API_URL}/orders/services/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderServiceData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message || "Cập nhật đơn đặt lịch thành công!");
  }

  return data;
};

export const createOrderProduct = async (
  orderProductData: OrderProductData
) => {
  const res = await fetch(`${API_URL}/orders/products/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderProductData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message || "Đặt hàng thành công!");
  }

  return data;
};

export const updateOrderProduct = async (
  id: string,
  orderProductData: OrderProductData
) => {
  const res = await fetch(`${API_URL}/orders/products/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderProductData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message || "Cập nhật đơn đặt hàng thành công!");
  }

  return data;
};

export const createProduct = async (productData: ProductData) => {
  const res = await fetch(`${API_URL}/products/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message || "Thêm sản phẩm thành công!");
  }

  return data;
};

export const updateProduct = async (id: string, productData: ProductData) => {
  const res = await fetch(`${API_URL}/products/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message || "Cập nhật sản phẩm thành công!");
  }

  return data;
};

export const deleteProduct = async (id: string) => {
  const res = await fetch(`${API_URL}/products/delete/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message || "Xóa sản phẩm thành công!");
  }

  return data;
};
