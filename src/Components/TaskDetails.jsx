import React, { useEffect, useState } from "react";
import "../App.css";
import { collection, getDocs, doc, deleteDoc,setDoc,query,where } from "firebase/firestore";
import { database } from "../database/firebase";
import { getToday, getTomorrow } from "../Utils/dateUtils";
import { getAuth } from "firebase/auth";
import TaskModal from "../Modal/TaskModal";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import LoadingOverlay from "./LoadingOverlay";


const TaskDetails = () => {
  const [tasks, setTasks] = React.useState([]);
  const [filteredTasks, setFilteredTasks] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [recentSelected,setRecentSelected] = React.useState(null);
  const [editTask,setEditTask] = React.useState(null);
  const [isModalOpen,setIsModalOpen] = React.useState(false);
  const [loading, setloading] = React.useState(false)

React.useEffect(() => {
const auth = getAuth();
setloading(true);

const unsubscribe = auth.onAuthStateChanged(async (currentUser) =>{
  if(!currentUser){
    setloading(false);
    return;
  }

  try{
    const myUid = currentUser.uid;
    const taskRef = collection(database,"tasks");
    
    const createdQuery = query(taskRef,where("userId","==",myUid))
    const assignedQuery = query(taskRef,where("assign.uid","==",myUid));

    const [createdSnap,assignedSnap] = await Promise.all ([
      getDocs(createdQuery),
      getDocs(assignedQuery),
    ]);

    const createdTasks = createdSnap.docs.map((doc)=>({
      id:doc.id,
      ...doc.data(),
    }));

    const assignedTasks = assignedSnap.docs.map((doc)=>({
      id:doc.id,
      ...doc.data(),
    }));

    const allTasks =[
      ...createdTasks,
      ...assignedTasks.filter(
        (task)=> !createdTasks.some((created)=>created.id === task.id)
      ),
    ];

    allTasks.sort((a,b)=>{
      const dateA = a.dueDate?.toDate?.() || new Date(a.dueDate);
      const dateB = b.dueDate?.toDate?.() || new Date(b.dueDate);
      return dateA - dateB;
    });

    setTasks(allTasks);
  }catch(err){
    console.log("Error fetching tasks:",err);
    alert("Failed to fetch tasks,please try again later")
  }finally{
    setloading(false)
  }
});
return ()=>unsubscribe();
  }, [])
  

useEffect(()=>{
  const filtered = tasks.filter((task)=>{
    const name = task.task_name?.toLowerCase() || "";
    const assignedUser = task.assign?.username?.toLowerCase() || "";
    return(
      name.includes(searchQuery.toLowerCase())||
      assignedUser.includes(searchQuery.toLowerCase())
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

  const handleCompleteTask = async (tasks) => {
    try {

      setRecentSelected(tasks.id);
      setTimeout( async ()=>{

      const taskRef = doc(database,"tasks",tasks.id);
      const completeRef = doc(database,"completed_task",tasks.id)
      
      await setDoc(completeRef,tasks)
      await deleteDoc(taskRef)

    
        setTasks((prev)=>prev.filter((t)=>t.id !==tasks.id));
        setRecentSelected(null);
      },500);

    } catch (err) {
      console.log("Error Completing task:", err);
      alert("Failed to complete task");
    }
  };


//delete

const handleDeleteTask = async (taskId) =>{
  if(!window.confirm("Are you sure you want to delete this task permanently?")) return;
  try{
    await deleteDoc(doc(database,"tasks",taskId));
    setTasks((prev)=>prev.filter((t)=>t.id !==taskId));
  }catch(err){
    console.log("Error deleting task:",err);
    alert("Faild to delete task");
  }
}


  const handleModalClose = () =>{
    setIsModalOpen(false);
    setEditTask(null);
  }

  return (
    <>
    {loading && <LoadingOverlay message="Loading Task..."/>}
     <div className="flex h-screen">
      <Sidebar/>
      <div className="flex flex-col flex-1">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
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
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {(searchQuery?filteredTasks:tasks).map((item, idx) => {
            return (
              <tr key={item.id} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-3 flex items-center gap-2">
                  <div
                    className="group w-5 h-5 border-2 border-black rounded-full cursor-pointer flex items-center justify-center hover:bg-yellow-500 transition-colors"
                    onClick={() => recentSelected !== item.id && handleCompleteTask(item)}
                  >
                    <svg
                      className="w-3 h-3 text-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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
                  <span className={`font-medium transition-all duration-300 ${recentSelected === item.id ? 'line-through text-gray-400':''}`}>{item.task_name}</span>
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
                  <span className="px-3 py-2 bg-[#FAE150] border-3 text-black text-xs font-semibold rounded-full">
                    {item.stage}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-2 text-xs font-semibold rounded-full border-3 ${
                      item.priority === "High"
                        ? "bg-[#CF984A]"
                        : item.priority === "Medium"
                        ? "bg-[#F7B2A0]"
                        : item.priority === "Low"
                        ? "bg-[#F5E8C4]"
                        : "bg-gray-300"
                    }`}
                  >
                    {item.priority}
                  </span>
                </td>
                <td className="px-4 py-3">{item.description}</td>
                <td className="px-4 py-3 font-medium">{item.assign.username || "unassigned"}</td>

                <td className="px-4 py-3 ">
                    <button onClick={()=>{
                      setEditTask(item);
                      setIsModalOpen(true);
                    }} className="bg-[#FAE150] text-black font-semibold cursor-pointer border rounded-lg px-3 py-1">Edit</button>   
                </td>
                <td className="px-4 py-3 ">
                    <button onClick={()=>{
                      handleDeleteTask(item.id);
                    }} className="bg-[#CF984A] text-black font-semibold cursor-pointer border rounded-lg px-3 py-1">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
       {isModalOpen && editTask && (
        <TaskModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        editingTask={editTask}
        onTaskUpdated={(updatedTask)=>{
          setTasks((prev)=>prev.map((t)=>(t.id === updatedTask.id?updatedTask :t)))
          handleModalClose();
        }}
        onTaskCreated={(newTask)=>{
          setTasks((prev)=>[...prev,newTask]);
          handleModalClose();
        }}

        />
       )}
    </div>
      </div>

     </div> 
    
    
    
    </>
  
  );
};

export default TaskDetails;
