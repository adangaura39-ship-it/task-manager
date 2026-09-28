import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import TaskCounter from "./components/TaskCounter";
import TaskList from "./components/TaskList";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const addTask = (text, category) => {
    setTasks([...tasks, { id: crypto.randomUUID(), text, category, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, text) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text } : task)));
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const visibleTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && !task.completed) ||
      (statusFilter === "Completed" && task.completed);
    const matchesCategory = categoryFilter === "All" || task.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  return (
    <main className="app">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <TaskForm onAdd={addTask} />
      <FilterBar
        status={statusFilter}
        category={categoryFilter}
        onStatusChange={setStatusFilter}
        onCategoryChange={setCategoryFilter}
      />
      <TaskCounter tasks={tasks} />
      <TaskList
        tasks={visibleTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </main>
  );
}

export default App;
