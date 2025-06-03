import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { database } from "../database/firebase";
import { Timestamp } from "firebase/firestore";
import { getToday, getTomorrow } from "../Utils/dateUtils";

const TaskList = ({ selectedDate,searchQuery }) => {
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [recentlyCompletedId, setRecentlyCompletedId] = useState(null);
  const [filteredTasks,setFilteredTasks] = useState([]);

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);

      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user || !selectedDate) {
          setTasks([]);
          return;
        }

        const taskRef = collection(database, "tasks");

        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);

        const q = query(
          taskRef,
          where("userId", "==", user.uid),
          where("dueDate", ">=", Timestamp.fromDate(startOfDay)),
          where("dueDate", "<=", Timestamp.fromDate(endOfDay))
        );
        

        const querySnapshot = await getDocs(q);
        const taskList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTasks(taskList);
      } catch (error) {
        console.error("Error in fetching the data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [selectedDate]);

  useEffect(()=>{
    const filtered = tasks.filter((task)=>{
      const name = task.task_name?.toLowerCase() || "";
      const assigne = task.assigne?.toLowerCase() || "";
      return(
        name.includes(searchQuery.toLowerCase()) ||
        assigne.includes(searchQuery.toLowerCase())
      );
    });
    setFilteredTasks(filtered);
  },[searchQuery,tasks]);

  const getDueDate = (dueDate) => {
    if (!dueDate) return "No Due Date";

    const date = dueDate.toDate ? dueDate.toDate() : new Date(dueDate);
    if (isNaN(date)) return "Invalid date";

    const today = new Date(getToday());
    const tomorrow = new Date(getTomorrow());

    const isSameDate = (a, b) => {
      return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
      );
    };

    if (isSameDate(date, today)) return "Today";
    if (isSameDate(date, tomorrow)) return "Tomorrow";
    if (date < today) return "Overdue";
    return date.toLocaleDateString();
  };

  const handleCompleteTask = async (taskId) => {
    try {
      setRecentlyCompletedId(taskId); // trigger animation

      setTimeout(async () => {
        const taskToDelete = tasks.find((t) => t.id === taskId);
        if (!taskToDelete) return;

        const taskRef = doc(database, "tasks", taskId);
        const completedRef = doc(database, "completed_task", taskId);

        await setDoc(completedRef, taskToDelete); // move to completed
        await deleteDoc(taskRef); // remove from active tasks

        setTasks((prev) => prev.filter((t) => t.id !== taskId)); // update local state
        setRecentlyCompletedId(null);
      }, 500); // wait for animation
    } catch (err) {
      console.error("Failed to complete task:", err);
      alert("Failed to complete task");
    }
  };

  if (loading) return <div>Loading Task....</div>;

  if (tasks.length === 0) {
    return <div>No tasks for {selectedDate}</div>;
  }

  return (
    <>
      <table className="min-w-full table-auto bg-gray-50 rounded-lg overflow-hidden shadow-md">
        <thead className="text-left text-gray-700 text-sm font-semibold border-b">
          <tr>
            <th className="px-4 py-3">Tasks</th>
            <th className="px-4 py-3">Due Date</th>
            <th className="px-4 py-3">Stage</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {filteredTasks.map((item) => (
            <tr key={item.id} className="border-t hover:bg-gray-50 transition">
              <td className="px-4 py-3 flex items-center gap-2">
                <div
                  className="w-5 h-5 border-2 border-black rounded-full flex justify-center items-center  cursor-pointer hover:bg-yellow-400 transition-colors"
                  onClick={() => handleCompleteTask(item.id)}
                >

                   <svg
                      className="w-3 h-3 text-green-800"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                </div>
                <span
                  className={`font-medium transition-all duration-300 ${
                    recentlyCompletedId === item.id
                      ? "line-through text-gray-400 opacity-50 scale-95"
                      : ""
                  }`}
                >
                  {item.task_name}
                </span>
              </td>

              <td
                className={`px-4 py-3 font-semibold ${
                  getDueDate(item.dueDate) === "Today"
                    ? "text-yellow-500"
                    : getDueDate(item.dueDate) === "Tomorrow"
                    ? "text-gray-500"
                    : getDueDate(item.dueDate) === "Overdue"
                    ? "text-red-500"
                    : "text-black"
                }`}
              >
                {getDueDate(item.dueDate)}
              </td>

              <td className="px-4 py-3">
                <span className="px-3 py-2 bg-amber-300 text-black text-xs font-bold rounded-full">
                  {item.stage}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </>
  );
};

export default TaskList;
