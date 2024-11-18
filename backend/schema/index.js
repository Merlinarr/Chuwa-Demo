const joi = require("joi");

const username = joi.string().email().required();
const productId = joi.string().required();
const code = joi.string().required();
const cart = joi.array();
const product = joi.object().required();
const isRemove = joi.boolean();
const password = joi
  .string()
  .pattern(/^[\S]{1,32}$/)
  .required();

exports.UserAccount = {
  body: {
    username,
    password,
    cart,
  },
};

exports.ModifyItem = {
  body: {
    productId,
    isRemove,
  },
};
exports.AddProduct = {
  body: {
    product,
  },
};
exports.EditProduct = {
  body: {
    product,
  },
};
exports.CodeVerify = {
  body: {
    code,
  },
};
