import { GetProductListParams } from '#/api';
import { Cart, CartItem, DiscountCode } from '#/entity';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ShoppingState = {
  cartModal: boolean;
  pagination: GetProductListParams;
  total: number;
  CartItemBeforeLogin: CartItem[];
  Cart: Cart;
};

const initialState: ShoppingState = {
  cartModal: false,
  pagination: {
    page: 1,
    pageSize: 10,
    sortOrder: 'desc',
    search: '',
    sortBy: 'createdAt',
  },
  total: 0,
  CartItemBeforeLogin: [],
  Cart: {
    items: [],
    discountAmount: 0,
    subtotal: 0,
    total: 0,
    tax: 0,
  },
};

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    setCartItemBefore: (state, action: PayloadAction<CartItem[]>) => {
      state.CartItemBeforeLogin = action.payload;
    },
    setCart: (state, action: PayloadAction<Cart>) => {
      state.Cart = action.payload;
    },
    setCartModal: (state, action: PayloadAction<boolean>) => {
      state.cartModal = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.pagination.page = action.payload;
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pagination.pageSize = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.pagination.search = action.payload;
    },
    setSortOrder(state, action: PayloadAction<'asc' | 'desc'>) {
      state.pagination.sortOrder = action.payload;
    },
    setSortBy(state, action: PayloadAction<'price' | 'createdAt'>) {
      state.pagination.sortBy = action.payload;
    },
    resetFilters(state) {
      state.pagination.page = initialState.pagination.page;
      state.pagination.pageSize = initialState.pagination.pageSize;
      state.pagination.search = initialState.pagination.search;
      state.pagination.sortOrder = initialState.pagination.sortOrder;
      state.pagination.sortBy = initialState.pagination.sortBy;
    },
    resetCartAndItems(state) {
      state.Cart = initialState.Cart
      state.CartItemBeforeLogin = initialState.CartItemBeforeLogin
    },
    resetCartItemsBeforeLogin(state) {
      state.CartItemBeforeLogin = initialState.CartItemBeforeLogin
    },
  },
});

export const {
  resetCartItemsBeforeLogin,
  resetCartAndItems,
  setCartItemBefore,
  setCart,
  setTotal,
  setPage,
  setPageSize,
  setSearch,
  setSortOrder,
  setSortBy,
  resetFilters,
  setCartModal,
} = shoppingSlice.actions;

export const calcCart = (data: CartItem[], discountCode?: DiscountCode) => {
  const subtotalPriceBeforeDiscount = data.reduce((acc, c) => acc + c.totalPrice, 0);
  const discountPrice = subtotalPriceBeforeDiscount * (discountCode ? discountCode.rate : 0);
  const subtotalPriceAfterDiscount = subtotalPriceBeforeDiscount - discountPrice;
  let cart: Cart = {
    items: data,
    discountAmount: discountPrice,
    discountCode: discountCode ? discountCode.label : undefined,
    subtotal: subtotalPriceBeforeDiscount,
    tax: subtotalPriceAfterDiscount * 0.06,
    total: subtotalPriceAfterDiscount * 1.06,
  };
  return cart;
};

export default shoppingSlice.reducer;
