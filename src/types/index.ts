export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  fullName: string;
  phone: string;
  studentId: string;
  email: string;
  password: string;
}

export interface UserData {
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  className: string;
  major: string;
}

export interface OrderServiceData {
  id?: string;
  fullName: string;
  phone: string;
  serviceType: string;
  date: string;
  time: string;
  location: string;
  status: string;
  userId?: string;
  studentId: string;
  email: string;
  note?: string;
  serviceDetail?: string;
  deviceInfo?: string;
}

export interface OrderProductData {
  id?: string;
  productName: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  totalPrice: string;
  userId?: string;
}

export interface FeedbackData {
  userId: string | undefined;
  feedbackType: string;
  title: string;
  content: string;
}

export interface ServiceData {
  id?: string;
  serviceName: string;
  description: string;
  time: string;
  location: string;
  price: string;
}

export interface BlogData {
  id?: string;
  title: string;
  description: string;
  category: string;
  content: string;
  author: string;
  publishedDate?: string;
}

export interface ProductData {
  id?: string;
  productName: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
}

export interface LoginResponse {
  success: boolean;
  userInfo: {
    userId: string;
    fullName: string;
    email: string;
    role: "user" | "admin";
    phone: string;
  };
  message: string;
  token: string;
}

export interface User {
  userId: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  phone: string;
}

export interface Service {
  serviceName: string;
  description: string;
  price: string;
  time: string;
  location: string;
  features?: string[];
}

export interface Product {
  id: string;
  productName: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface Blog {
  id?: string;
  title: string;
  slug?: string;
  content?: string;
  description: string;
  image?: string;
  author: string;
  category: string;
  publishedDate?: string;
  readTime?: string;
}

export interface OrderService {
  id?: string;
  serviceType: string;
  fullName: string;
  phone: string;
  date: string;
  location: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
}

export interface Feedback {
  feedbackType: string;
  title: string;
  content: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
}
