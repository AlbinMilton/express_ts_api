import { Router } from "express";
import {
  createUser,
  deleteUserById,
  findAllUsers,
} from "../controllers/user.controller";
import { getUserById } from "../controllers/user.controller";
import { updateById } from "../controllers/user.controller";

const router = Router();

router.get("/", findAllUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.patch("/:id", updateById);
router.delete("/:id", deleteUserById);
export default router;
