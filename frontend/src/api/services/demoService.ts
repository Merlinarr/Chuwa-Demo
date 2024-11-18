import { GetProductListParams, GetProductListResponse, ModifyItemParams, UserAccount } from '#/api';
import { AxiosResponse } from 'axios';
import apiClient from '../apiClient';
import { Cart, CartItem, DiscountCode, Product } from '#/entity';

export enum DemoApi {
  LOGIN = '/api/login',
  REGISTRATION = '/api/reguser',

  PRODUCT_LIST = '/api/productlist',
  ADD_ITEM = '/auth/additem',
  DELETE_ITEM = '/auth/deleteitem',
  VERIFY_CODE = '/api/verifycode',
  GET_CART = '/auth/getcart',
  PRODUCT_DETAIL = '/api/productdetail',

  ADD_PRODUCT = '/auth/addproduct',
  EDIT_PRODUCT = '/auth/editproduct',
  CHECKOUT = '/auth/checkout',
}

const regAction = (data: UserAccount) => apiClient.post({ url: DemoApi.REGISTRATION, data });
const loginAction = (data: UserAccount) => apiClient.post({ url: DemoApi.LOGIN, data });
const getProducListAction = (params: GetProductListParams) =>
  apiClient.get<AxiosResponse<GetProductListResponse>>({ url: DemoApi.PRODUCT_LIST, params });
const getProducDetailAction = (id: string) =>
  apiClient.get<AxiosResponse<Product>>({ url: `${DemoApi.PRODUCT_DETAIL}/${id}` });
const addItemAction = (data: ModifyItemParams) =>
  apiClient.post<AxiosResponse<CartItem[]>>({ url: DemoApi.ADD_ITEM, data });
const addProductAction = (data: { product: Partial<Product> }) =>
  apiClient.post({ url: DemoApi.ADD_PRODUCT, data });
const editProductAction = (data: { product: Partial<Product> }) =>
  apiClient.post({ url: `${DemoApi.EDIT_PRODUCT}`, data });
const deleteItemAction = (data: ModifyItemParams) =>
  apiClient.post<AxiosResponse<CartItem[]>>({ url: DemoApi.DELETE_ITEM, data });
const verifyCodeAction = (data: { code: string }) =>
  apiClient.post<AxiosResponse<DiscountCode>>({ url: DemoApi.VERIFY_CODE, data });


const getCartAction = (data?: { code: string }) =>
  apiClient.get<AxiosResponse<Cart>>({ url: DemoApi.GET_CART, data });

const checkout = () => apiClient.post({ url: DemoApi.CHECKOUT });

export default {
  regAction,
  checkout,
  editProductAction,
  addProductAction,
  getProducDetailAction,
  getCartAction,
  loginAction,
  getProducListAction,
  addItemAction,
  deleteItemAction,
  verifyCodeAction,
};
