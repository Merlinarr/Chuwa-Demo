const express = require("express");
const router = express.Router();
const middleware = require("../Middelware/customized");
const handler = require("../router_handler");
const expressJoi = require("@escook/express-joi");

const {
  UserAccount,
  ModifyItem,
  CodeVerify,
  AddProduct,
  EditProduct,
} = require("../schema");

router.post("/api/reguser", expressJoi(UserAccount), handler.regUser);

router.post("/api/login", expressJoi(UserAccount), handler.login);

router.get("/auth/getcart", handler.getCart);

router.post("/auth/checkout", handler.checkout);
router.post(
  "/auth/addproduct",
  middleware.CheckAdmin,
  expressJoi(AddProduct),
  handler.addProduct
);
router.post(
  "/auth/editproduct",
  middleware.CheckAdmin,
  expressJoi(EditProduct),
  handler.editProduct
);

router.post("/auth/additem", expressJoi(ModifyItem), handler.addItem);
router.post("/auth/deleteitem", expressJoi(ModifyItem), handler.deleteItem);

router.get("/api/productlist", handler.getProductList);
router.get("/api/productdetail/:id", handler.getProductDetail);
router.post("/api/verifycode", expressJoi(CodeVerify), handler.verifyCode);

module.exports = router;
