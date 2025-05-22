import React from "react";
import '../App.css';
const tasks = [
  {
    task: "Finishing Monthly Report",
    dueDate: "Today",
    stage: "In progress",
    priority: "High",
    description: "Marketing Operations",
    assign: "Savan",
  },
  {
    task: "Contract Signing",
    dueDate: "Tomorrow",
    stage: "In progress",
    priority: "Medium",
    description: "Operations for JSW",
    assign: "Aditya",
  },
  {
    task: "Market Overview Keywords",
    dueDate: "Today",
    stage: "In progress",
    priority: "High",
    description: "Telecalling for product",
    assign: "Manoj",
  },
  {
    task: "Attend zoom call of JSW",
    dueDate: "This Week",
    stage: "In progress",
    priority: "High",
    description: "Telecalling for Xlor site",
    assign: "Vikram",
  },
];

const TaskDetails = () => {
  return (
    <div className="p-6 max-w-4xl ">
      <table className="min-w-full table-auto bg-white  rounded-lg overflow-hidden shadow-sm">
        <thead className=" text-left text-gray-700 text-sm font-semibold border-b">
          <tr>
            <th className="px-4 py-3">Tasks</th>
            <th className="px-4 py-3">Due Date</th>
            <th className="px-4 py-3">Stage</th>
            <th className="px-4 py-3">Priority</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Assign</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {tasks.map((item, idx) => (
            <tr
              key={idx}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-black rounded-full"></div>
                <span className="font-medium">{item.task}</span>
              </td>
              <td
                className={`px-4 py-3 font-semibold ${
                  item.dueDate === "Today"
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
              >
                {item.dueDate}
              </td>
              <td className="px-4 py-3">
                <span className="px-3 py-2 bg-[#FAE150] border-3 text-black text-xs font-semibold rounded-full">
                  {item.stage}
                </span>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-3 py-2 text-xs font-semibold rounded-full border-3 ${
                    item.priority === "High"
                      ? "bg-[#CF984A]"
                      : "bg-[#F5E8C4]"
                  }`}
                >
                  {item.priority}
                </span>
              </td>
              <td className="px-4 py-3">{item.description}</td>
              <td className="px-4 py-3 font-medium">{item.assign}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskDetails;
