import { useState } from "react";
import { CATEGORIES } from "../constants";

function TaskForm({ onAdd }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim(), category);
    setText("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What needs to be done?"
        aria-label="Task description"
      />
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        aria-label="Task category"
      >
        {CATEGORIES.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <button type="submit" className="btn btn-primary">
        Add task
      </button>
    </form>
  );
}

export default TaskForm;
