import { Router } from "express";
import multer from "multer";

import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetalUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/products/CreateProductController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from "./config/multer";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { ListByCategoryController } from "./controllers/products/ListByCategoryController";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

//-- ROTAS USER --
router.post("/users", new CreateUserController().handle);

router.post("/session", new AuthUserController().handle);

router.get("/me", isAuthenticated, new DetailUserController().handle);

//-- ROTAS CATEGORY
router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);

router.get("/category", isAuthenticated, new ListCategoryController().handle);

//-- ROTAS PRODUCT
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);

router.get(
  "/category/product",
  isAuthenticated,
  new ListByCategoryController().handle
);

//-- ROTAS ORDER
router.post("/order", isAuthenticated, new CreateOrderController().handle);

router.delete("/order", isAuthenticated, new RemoveOrderController().handle);

export { router };
