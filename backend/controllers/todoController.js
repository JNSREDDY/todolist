import { db } from "../config/db.js";

export const getTodos = (req, res) => {
  db.query("SELECT * FROM todos", (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
};

export const addTodo = (req, res) => {
  const { task } = req.body;
  db.query("INSERT INTO todos (task) VALUES (?)", [task], (err, result) => {
    if (err) return res.json(err);
    return res.json({ message: "Task added" });
  });
};

export const deleteTodo = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM todos WHERE id = ?", [id], (err, result) => {
    if (err) return res.json(err);
    return res.json({ message: "Task deleted" });
  });
};

export const toggleTodo = (req, res) => {
  const id = req.params.id;
  db.query(
    "UPDATE todos SET completed = NOT completed WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.json(err);
      return res.json({ message: "Task updated" });
    }
  );
};
