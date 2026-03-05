import { Router } from "express";
import {
  createOrder,
  deleteOrderById,
  findAllOrders,
  getOrderById,
  updateById,
} from "../controllers/order.controller";
const router = Router();

router.get("/", findAllOrders);
router.post("/", createOrder);
router.get("/:id", getOrderById);
router.patch("/:id", updateById);
router.delete("/:id", deleteOrderById);

router.get("/", findAllOrders);
router.post("/", createOrder);
router.get("/:id", getOrderById);
router.patch("/:id", updateById);
router.delete("/:id", deleteOrderById);
export default router;
