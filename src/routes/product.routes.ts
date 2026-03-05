import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  findAllProducts,
} from "../controllers/product.controller";
import { getProductById } from "../controllers/product.controller";
import { updateById } from "../controllers/product.controller";
const router = Router();

router.get("/", findAllProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.patch("/:id", updateById);
router.delete("/:id", deleteProductById);
export default router;
