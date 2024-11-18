export interface UserInfo {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  lastLogin: string;
  isActive: string;
}

export interface Product {
  id: string; // 产品唯一标识符
  name: string; // 产品名称
  description: string; // 产品描述
  category: string; // 产品类别
  price: number; // 产品价格
  stock: number; // 库存数量
  imageUrl: string; // 产品图片链接
  isOutOfStock: boolean; // 是否缺货
  isActive: boolean; // 是否激活
  createdAt: string; // 创建时间
}
export interface CartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  discountCode?: string;
  discountAmount: number;
  subtotal: number;
  total: number;
  tax: number;
}
export interface DiscountCode {
  label: string;
  rate: number;
}
