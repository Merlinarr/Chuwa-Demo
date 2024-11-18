const jwt = require("jsonwebtoken");
const config = require("../config");
const dayjs = require("dayjs");
require("../type");
const db = require("../db/fakeData.json");
/**user**/
exports.regUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    /** @type {import("../type").User} */
    const isExist = db.users.find((u) => u.email == username);
    if (isExist)
      return res
        .status(400)
        .send(
          "The username you entered is already in use. If you’ve forgotten your password, kindly use the reset option to regain access."
        );
    const newUser = {
      email: username,
      password: password,
      id: CountMaxId(db.users) + 1 + "",
      isActive: true,
      createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      lastLogin: null,
      role: "user",
    };
    db.users.push(newUser);
    res.status(201).json("registratiom success");
  } catch (e) {
    res.status(500).send("Server error.");
  }
};
exports.login = async (req, res) => {
  try {
    const { username, password, cart } = req.body;
    const users = db.users;

    const currentUser = users.find((u) => u.email == username);
    if (!currentUser) {
      return res
        .status(400)
        .send(
          "The username or password you entered is incorrect. Please double-check your credentials and try again."
        );
    }

    const isPasswordValid = password == currentUser.password;
    if (!isPasswordValid) {
      return res
        .status(400)
        .send(
          "The username or password you entered is incorrect. Please double-check your credentials and try again."
        );
    }

    const payload = Object.assign({}, currentUser);
    delete payload.password;

    const token = jwt.sign(payload, config.jwtSecretKey, {
      expiresIn: config.expiresIn,
    });
    currentUser.lastLogin = dayjs().format("YYYY-MM-DD HH:mm:ss");
    if (cart) {
      let newCart = [];
      /** @type {import("../type").CartItem[]} */
      const userDB = db.cart[currentUser.id] ? db.cart[currentUser.id] : [];
      let currentUserCart = [...userDB];
      for (let i = 0; i < cart.length; i++) {
        /** @type {import("../type").CartItem} */
        const element = cart[i];
        const existItem = currentUserCart.find(
          (x) => x.product.id == element.product.id
        );
        if (existItem) {
          existItem.quantity = existItem.quantity + element.quantity;
          existItem.totalPrice = existItem.quantity * existItem.product.price;
        } else {
          newCart.push(element);
        }
      }
      /** @type {import("../type").CartItem[]} */
      newCart = [...newCart, ...currentUserCart];
      db.cart[currentUser.id] = newCart;
    }
    res.status(200).json({
      token,
    });
  } catch (e) {
    res.status(500).send("Server error.");
  }
};

/**cart**/
exports.getCart = async (req, res) => {
  try {
    /** @type {import("../type").User} */
    const user = req.user;
    /** @type {string} */
    const code = req.query;
    const discountCode = db.discountCodes.find((c) => c.label == code);

    /** @type {import("../type").CartItem[]} */
    let currentUserCart = db.cart[user.id] ? db.cart[user.id] : [];

    const subtotalPriceBeforeDiscount = currentUserCart.reduce(
      (acc, c) => acc + c.totalPrice,
      0
    );
    const discountPrice =
      subtotalPriceBeforeDiscount * (discountCode ? discountCode.rate : 0);
    const subtotalPriceAfterDiscount =
      subtotalPriceBeforeDiscount - discountPrice;
    /** @type {import("../type").Cart} */
    let cart = {
      items: currentUserCart,
      discountAmount: discountPrice,
      discountCode: discountCode ? discountCode.label : undefined,
      subtotal: subtotalPriceBeforeDiscount,
      tax: subtotalPriceAfterDiscount * 0.06,
      total: subtotalPriceAfterDiscount * 1.06,
    };
    res.status(200).send(cart);
  } catch (e) {
    res.status(500).send("Server error.");
  }
};
/**cart item**/
exports.deleteItem = async (req, res) => {
  try {
    /** @type {string} */
    const productId = req.body.productId;
    /** @type {boolean} */
    const isRemove = req.body.isRemove;
    /** @type {import("../type").User} */
    const user = req.user;

    /** @type {import("../type").CartItem[]} */
    let currentUserCart = db.cart[user.id];
    /** @type {import("../type").CartItem} */
    const cartItem = currentUserCart.find((c) => c.product.id == productId);
    cartItem.quantity -= 1;
    cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
    if (cartItem.quantity == 0 || isRemove) {
      currentUserCart = currentUserCart.filter(
        (c) => c.product.id != productId
      );
    }
    db.cart[user.id] = currentUserCart;
    res.status(201).send();
  } catch (e) {
    res.status(500).send("Server error.");
  }
};
exports.addItem = async (req, res) => {
  try {
    /** @type {string} */
    const productId = req.body.productId;

    /** @type {import("../type").User} */
    const user = req.user;

    /** @type {import("../type").CartItem[]} */
    let currentUserCart = db.cart[user.id] || [];

    /** @type {import("../type").CartItem} */
    const cartItem = currentUserCart.find((c) => c.product.id == productId);
    const productInDB = db.products.find((p) => p.id == productId);
    if (productInDB.stock == 0) return res.status(400).send("Out of stock");
    if (cartItem?.quantity + 1 > productInDB.stock)
      return res
        .status(400)
        .send("Unable to add the item due to insufficient stock.");
    if (cartItem) {
      cartItem.quantity += 1;
      cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
    } else {
      let product = db.products.find((p) => p.id == productId);

      /** @type {import("../type").CartItem} */
      let newItem = {
        product: product,
        quantity: 1,
        totalPrice: product.price,
      };
      currentUserCart.push(newItem);
    }
    db.cart[user.id] = currentUserCart;
    res.status(201).send();
  } catch (e) {
    res.status(500).send("Server error.");
  }
};

/**product**/
exports.getProductDetail = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = db.products.find((p) => p.id == productId);
    if (!product) {
      return res
        .status(400)
        .send(
          "We’re sorry, but no matching product information was found. Please try refining your search."
        );
    }
    res.status(200).send(product);
  } catch (e) {
    res.status(500).send("Server error.");
  }
};
exports.addProduct = async (req, res) => {
  try {
    /** @type {import("../type").Product} */
    const product = req.body.product;
    product.id = CountMaxId(db.products) + 1 + "";
    product.isOutOfStock = product.stock == 0 ? true : false;
    product.isActive = true;
    product.createdAt = dayjs().format("YYYY-MM-DD HH:mm:ss");
    db.products.push(product);
    res.status(201).send();
  } catch (e) {
    res.status(500).send("Server error.");
  }
};
exports.checkout = async (req, res) => {
  try {
    const user = req.user;
    db.cart[user.id] = [];
    res.status(201).send();
  } catch (e) {
    res.status(500).send("Server error.");
  }
};
exports.deleteProduct = async (req, res) => {
  /** @type {string} */
  const productId = req.body.productId;
  db.products.forEach((p) => {
    if (p.id == productId) {
      p.isActive = false;
    }
  });
  let userNames = Object.keys(db.cart);
  userNames.forEach((name) => {
    db.cart[name] = db.cart[name].filter((c) => c.product.id != productId);
  });
  res.status(201).send();
};
exports.editProduct = async (req, res) => {
  try {
    /** @type {import("../type").Product} */
    const updateProduct = req.body.product;
    const currentProduct = db.products.find((p) => p.id == updateProduct.id);
    if (currentProduct) {
      let newProducts = db.products.filter((p) => p.id != updateProduct.id);
      let updatedProduct = { ...currentProduct, ...updateProduct };
      newProducts = [...newProducts, updatedProduct];
      db.products = newProducts;

      let userKeys = Object.keys(db.cart);
      userKeys.forEach((key) => {
        /** @type {import("../type").CartItem[]} */
        const userCart = db.cart[key];
        let newUserCart = userCart.filter(
          (i) => i.product.id != updatedProduct.id
        );
        db.cart[key] = newUserCart;
      });
    }
    res.status(201).send();
  } catch (e) {
    res.status(500).send("Server error.");
  }
};
exports.getProductList = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      sortOrder = "asc",
      search = "",
      sortBy = "price",
    } = req.query;

    let products = [...db.products.filter((p) => p.isActive)];

    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().indexOf(searchLower) > -1 ||
          p.description.toLowerCase().indexOf(searchLower) > -1
      );
    }

    if (sortBy === "price") {
      if (sortOrder === "asc") {
        products.sort((a, b) => a.price - b.price);
      } else if (sortOrder === "desc") {
        products.sort((a, b) => b.price - a.price);
      }
    } else if (sortBy === "createdAt") {
      if (sortOrder === "asc") {
        products.sort(
          (a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
        );
      } else if (sortOrder === "desc") {
        products.sort(
          (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
        );
      }
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + parseInt(pageSize);
    const paginatedProducts = products.slice(startIndex, endIndex);
    res.status(200).json({
      total: products.length,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      data: paginatedProducts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyCode = async (req, res) => {
  try {
    const verifyCode = req.body.code;
    let code = db.discountCodes.find((c) => c.label == verifyCode);
    if (code) {
      return res.status(201).send(code);
    }
    res.status(400).send("Not valid");
  } catch (e) {
    res.status(500).send("Server error.");
  }
};

function CountMaxId(sets) {
  let maxId = 0;
  sets.forEach((s) => {
    const currentId = parseInt(s.id, 10);
    if (currentId > maxId) {
      maxId = currentId;
    }
  });
  return maxId;
}
