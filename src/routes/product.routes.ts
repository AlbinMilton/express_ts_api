import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  findAllProducts,
} from "../controllers/product.controller";
import { getProductById } from "../controllers/product.controller";

const router = Router();

router.get("/", findAllProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProductById);
export default router;
