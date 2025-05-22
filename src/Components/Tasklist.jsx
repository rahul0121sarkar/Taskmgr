import React from 'react';

const TaskList = () => {
  const tasks = [
    { id: 1, title: "Design new homepage", status: "Pending" },
    { id: 2, title: "Fix login issue", status: "In Progress" },
    { id: 3, title: "Update marketing plan", status: "Completed" },
  ];

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="p-3 rounded-md bg-amber-100 shadow text-black font-medium"
        >
          {task.title} <span className="text-sm text-gray-500">({task.status})</span>
              
        </li>

      ))}
  
    </ul>
  );
};

export default TaskList;
