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
const router = Router();

router.get("/", findAllUsers);
router.post("/", validate(createUserValidation), createUser);
router.get("/:id", getUserById);
router.put("/:id", updateById);
router.delete("/:id", deleteUserById);
export default router;
