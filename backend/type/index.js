/**
 * @typedef {Object} User
 * @property {string} id - 用户唯一标识符
 * @property {string} email - 用户的电子邮件地址
 * @property {string} password - 用户的密码
 * @property {string} role - 用户的角色，例如 "admin" 或 "user"
 * @property {string} createdAt - 用户创建账户的时间
 * @property {string} lastLogin - 用户最后一次登录的时间
 * @property {boolean} isActive - 用户是否处于激活状态
 */

/**
 * @typedef {Object} Product
 * @property {string} id - 产品唯一标识符
 * @property {string} name - 产品名称
 * @property {string} description - 产品描述
 * @property {string} category - 产品类别
 * @property {number} price - 产品价格
 * @property {number} stock - 库存数量
 * @property {string} imageUrl - 产品图片链接
 * @property {boolean} isOutOfStock - 是否缺货
 * @property {boolean} isActive - 是否缺货
 * @property {string} createdAt - 创建时间
 */

/**
 * @typedef {Object} CartItem
 * @property {Product} product - 购物车中的产品
 * @property {number} quantity - 产品数量
 * @property {number} totalPrice - 当前产品的小计金额
 */

/**
 * @typedef {Object} Cart
 * @property {CartItem[]} items - 购物车中的所有商品
 * @property {string} [discountCode] - 可选：折扣码
 * @property {number} discountAmount - 折扣金额
 * @property {number} subtotal - 商品总金额
 * @property {number} total - 最终总金额
 * @property {number} tax - tax
 */

module.exports = {};

// 示例：定义变量
/** @type {Product} */
const exampleProduct = {
  id: "meta-quest2",
  name: "Meta Quest2 VR",
  description:
    "Hundreds of hit games, one-of-a-kind experiences, live events, new ways to stay fit and a growing community.",
  category: "Electronics",
  price: 299,
  stock: 10,
  imageUrl: "https://example.com/images/meta-quest2.jpg",
  isOutOfStock: false,
  isActive: false,
  createdAt: "2024-11-10 10:00:00",
};

/** @type {CartItem} */
const exampleCartItem = {
  product: exampleProduct,
  quantity: 1,
  totalPrice: 299,
};

/** @type {Cart} */
const exampleCart = {
  items: [exampleCartItem],
  discountCode: "20% OFF",
  discountAmount: 99.8,
  subtotal: 499,
  tax: 40,
  total: 449.1,
};
