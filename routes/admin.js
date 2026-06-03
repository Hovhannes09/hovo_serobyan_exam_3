import express from "express";
import { getAllUsers, deleteUser } from "../controllers/adminController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", authenticateToken, getAllUsers);
router.delete("/users/:id", authenticateToken, deleteUser);

export default router;
