import { Router } from "express";
import {
  createUser,
  deleteUserById,
  findAllUsers,
} from "../controllers/user.controller";
import { getUserById } from "../controllers/user.controller";
import { updateById } from "../controllers/user.controller";
import { validate } from "../middleware/validate.middleware";
import { createUserValidation } from "../models/user.model";
import { protect, restrictTo } from "../middleware/auth.middleware";
const router = Router();

router.get("/", findAllUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.patch("/:id", updateById);
router.delete("/:id", protect, restrictTo("admin"), deleteUserById);
export default router;
