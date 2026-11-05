export interface ImageItems {
  _id: string;
  public_id?: string;
  url: string;
}

export interface Gallery {
  _id: string;
  images: ImageItems[]
}

export interface User {
    _id: string;
    username: string;
    email: string;
    roles: number[];
    isPendingVendor?: boolean
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
  user: User
  createdAt: string;
  updatedAt: string;
}

export interface FormProductData {
  name: string;
  description: string;
  category: string[];
  gallery: string;
  price: number;
  stock: number;
  status: "Available" | "Sold out" | "Discontinued";
}

export interface AuthResponse {
  accessToken: string;
}

export interface Category {
  emoji: string;
  name: string;
  _id: string
}

export interface QueryParams {
  sort?: "priceAsc" | "priceDesc" | "bestSeller",
  page?: string,
  limit?: string,
  query?: string,
  status?: string,
}

export interface QueryParamsExtension extends QueryParams{
    id?: string,
}

export interface ProductPagination extends PagePagination{
  data: Product[];
}


export interface PagePagination {
  count: number;
  totalPage: number;
  currentPage: number;
}


export type CategoryListResponse = Category[];

export interface Register {
  username: string,
  email: string,
  password: string,
  otp: string,
}

export interface OrderItem {
  _id: string,
  name: string,
  quantity: number,
  price: number,
  product: string,
}

export interface IdAndInfo {
 _id: string,
 username: string,
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

export interface SubOrder {
  _id: string;
  shopId: IdAndInfo;
  parentOrder: string;
  user: IdAndInfo;
  orderItems: OrderItem[];
  subStatus: OrderStatus;
  subTotalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface ParentOrder {
  _id: string,
  user: string,
  subOrders: SubOrder[],
  totalPrice: number,
  createdAt: string,
}

export interface FormImgsFile {
  id: string;
  file: File;
  previewURL: string;
}

export interface CartInput {
    product: string,
    quantity?: number,
}

export interface CartItems {
  product: Product;
  quantity: number;
  _id: string
}

export interface Cart {
  _id: string;
  user: string;
  cartItems: CartItems[]
}

export interface OrderPagination extends PagePagination {
  data: SubOrder[]
}
