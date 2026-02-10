const BASE_URL = "https://todolist-4dck.onrender.com";

const fetchTodos = async () => {
  const res = await axios.get(BASE_URL);
  setTodos(res.data);
};

const addTask = async () => {
  if (!task) return;
  await axios.post(BASE_URL, { task });
  setTask("");
  fetchTodos();
};

const deleteTask = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  fetchTodos();
};

const toggleTask = async (id) => {
  await axios.put(`${BASE_URL}/${id}`);
  fetchTodos();
};
