import express from "express";
import {
  getTodos,
  addTodo,
  deleteTodo,
  toggleTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", addTodo);
router.delete("/:id", deleteTodo);
router.put("/:id", toggleTodo);

export default router;
