export interface ImageItems {
  _id: string;
  public_id?: string;
  url: string;
}

export interface Gallery {
  _id: string;
  images: ImageItems[]
}

export interface Product {
    _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  gallery: Gallery;
  stock: number;
  status: "Available" | "Sold out" | "Discontinued";
  user: string
  createdAt: string;
}

export interface User {
    _id: string;
    username: string;
    roles: number[];
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