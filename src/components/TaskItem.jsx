import { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);

  const handleSave = (event) => {
    event.preventDefault();
    if (!draft.trim()) return;
    onEdit(task.id, draft.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(task.text);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="task-item">
        <form className="edit-form" onSubmit={handleSave}>
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            aria-label="Edit task"
            autoFocus
          />
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button type="button" className="btn btn-ghost" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </li>
    );
  }

  return (
    <li className={`task-item ${task.completed ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.text}" as complete`}
      />
      <span className="task-text">{task.text}</span>
      <span className={`tag tag-${task.category.toLowerCase()}`}>
        {task.category}
      </span>
      <button type="button" className="btn btn-ghost" onClick={() => setIsEditing(true)}>
        Edit
      </button>
      <button type="button" className="btn btn-ghost" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
