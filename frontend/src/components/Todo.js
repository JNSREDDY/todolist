import React, { useState, useEffect } from "react";
import axios from "axios";

function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/api/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTask = async () => {
    if (!task) return;
    await axios.post("http://localhost:5000/api/todos", { task });
    setTask("");
    fetchTodos();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    fetchTodos();
  };

  const toggleTask = async (id) => {
    await axios.put(`http://localhost:5000/api/todos/${id}`);
    fetchTodos();
  };

  return (
    <div>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="add-btn" onClick={addTask}>
          Add
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              className="task-text"
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.task}
            </span>

            <div className="btn-group">
              <button
                className="done-btn"
                onClick={() => toggleTask(todo.id)}
              >
                Done
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
