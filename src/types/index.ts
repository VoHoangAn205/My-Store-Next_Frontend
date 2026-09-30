export interface Product {
    _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  gallery: string[];
  stock: number;
  createdAt: string;
}

export interface User {
    _id: string;
    username: string;
    role: number[];
}

export interface AuthResponse {
  accessToken: string;
}

export interface Category {
  emoji: string;
  name: string;
  _id: string
}

export type CategoryListResponse = Category[];