import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../database/firebase";
import { getAuth } from "firebase/auth";
import { getToday, getTomorrow } from "../Utils/dateUtils";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import LoadingOverlay from "../Components/LoadingOverlay";


const TaskCompleted = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  setLoading(true);

    const fetchCompletedTasks = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
          alert("You need to be logged in to view tasks");
          setLoading(false);
          return;
        }

        const myUid = currentUser.uid;
        const completedTasksRef = collection(database, "completed_task");

        // Fetch tasks assigned to or created by the user
        const q = query(
          completedTasksRef,
          where("userId", "==", myUid)
          // If you want to include assigned tasks, you need a composite index and more queries
        );

        const querySnapshot = await getDocs(q);

        const tasksData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort by dueDate ascending
        tasksData.sort((a, b) => {
          const dateA = a.dueDate?.toDate ? a.dueDate.toDate() : new Date(a.dueDate);
          const dateB = b.dueDate?.toDate ? b.dueDate.toDate() : new Date(b.dueDate);
          return dateA - dateB;
        });

        setTasks(tasksData);
      } catch (err) {
        console.error("Error fetching completed tasks:", err);
        alert("Failed to fetch completed tasks.");
      } finally{
        setLoading(false);
      }
    };

    fetchCompletedTasks();
  }, []);

  const getDueDate = (dueDate) => {
    if (!dueDate) return "No Due Date";

    const date = dueDate.toDate ? dueDate.toDate() : new Date(dueDate);
    if (isNaN(date)) return "Invalid date";

    const today = new Date(getToday());
    const tomorrow = new Date(getTomorrow());

    const isSameDate = (a, b) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();

    if (isSameDate(date, today)) return "Today";
    if (isSameDate(date, tomorrow)) return "Tomorrow";
    if (date < today) return "Overdue";
    return date.toLocaleDateString();
  };

  return (
    <>
    {loading && <LoadingOverlay message="Completed Task..."/>}
    <div className="flex h-screen">
        <Sidebar/>
        <div className="flex flex-col flex-1">
            <Navbar/>
    <div className="p-6 max-w-4xl">
      {loading ? (
        <div className="text-center mt-4">Loading Completed Tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="text-center mt-4">No completed tasks found.</div>
      ) : (
        <table className="min-w-full table-auto bg-white rounded-lg overflow-hidden shadow-sm">
          <thead className="text-left text-gray-700 text-sm font-semibold border-b">
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
            {tasks.map((task) => (
              <tr key={task.id} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-3">{task.task_name}</td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    getDueDate(task.dueDate) === "Today"
                      ? "text-yellow-500"
                      : getDueDate(task.dueDate) === "Tomorrow"
                      ? "text-gray-500"
                      : getDueDate(task.dueDate) === "Overdue"
                      ? "text-red-500"
                      : "text-black"
                  }`}
                >
                  {getDueDate(task.dueDate)}
                </td>
                <td className="px-4 py-3">
                  <span className="px-3 py-2 bg-[#FAE150] text-black text-xs font-semibold rounded-full">
                    {task.stage}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-2 text-xs font-semibold rounded-full ${
                      task.priority === "High"
                        ? "bg-[#CF984A]"
                        : task.priority === "Medium"
                        ? "bg-[#F7B2A0]"
                        : task.priority === "Low"
                        ? "bg-[#F5E8C4]"
                        : "bg-gray-300"
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="px-4 py-3">{task.description}</td>
                <td className="px-4 py-3 font-medium">{task.assign?.username || "unassigned"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
        </div>
    </div>
    </>
     
  );
};

export default TaskCompleted;
