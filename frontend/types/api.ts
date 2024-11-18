import { CartItem, Product } from "./entity";

export interface Result<T = any> {
  status: number;
  message: string;
  data?: T;
}
export interface UserAccount {
  password: string;
  username: string;
  cart?:CartItem[]
}

export interface GetProductListParams {
  page?: number;
  pageSize?: number;
  sortBy?: 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface GetProductListResponse {
  total: number;
  page: number;
  pageSize: number;
  data: Product[];
}

export interface ModifyItemParams {
  productId: string;
  isRemove?: boolean;
}
