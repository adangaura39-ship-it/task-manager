function TaskCounter({ tasks }) {
  const completed = tasks.filter((task) => task.completed).length;
  const remaining = tasks.length - completed;

  return (
    <p className="counter">
      {remaining} remaining, {completed} completed
    </p>
  );
}

export default TaskCounter;
