import React, { useState, useEffect } from "react";
import axios from "axios";

function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // ✅ IMPORTANT: Make sure this is EXACTLY your backend URL
  const BASE_URL = "https://todolist-4dck.onrender.com/api/todos";

  const fetchTodos = async () => {
    try {
      const res = await axios.get(BASE_URL);
      console.log("Backend Response:", res.data); // debug
      setTodos(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTask = async () => {
    if (!task) return;

    try {
      await axios.post(BASE_URL, { task });
      setTask("");
      fetchTodos();
    } catch (error) {
      console.error("Add Error:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const toggleTask = async (id) => {
    try {
      await axios.put(`${BASE_URL}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Toggle Error:", error);
    }
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
        {Array.isArray(todos) &&
          todos.map((todo) => (
            <li key={todo.id}>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.task}
              </span>

              <div>
                <button onClick={() => toggleTask(todo.id)}>
                  Done
                </button>

                <button onClick={() => deleteTask(todo.id)}>
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
