import React from "react";
import '../App.css';
import { collection,getDocs } from "firebase/firestore";
import { database } from "../database/firebase";
import { getToday,getTomorrow } from "../Utils/dateUtils";
import { getAuth } from "firebase/auth";

const TaskDetails = () => {

  const [tasks,setTasks] = React.useState([]);
  
  React.useEffect(()=>{
    const fetchTasks = async()=>{
      try{
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if(!currentUser){
          alert("You need to be logged in to view tasks");
          return;
        }

        const querySnapshot = await getDocs(collection(database,"tasks"));
        const taskData = querySnapshot.docs.map((doc)=>({
          id:doc.id,
          ...doc.data()
        }));

        const userTasks = taskData.filter(
          (task) => task.userId === currentUser.uid
        );

        userTasks.sort((a,b)=>{
          const dateA = a.dueDate?.toDate?.() || new Date(a.dueDate);
          const dateB = b.dueDate?.toDate?.() || new Date(b.dueDate);
          return dateA - dateB
        })

        setTasks(userTasks);
      }catch(err){
        console.error("Error fetching tasks:", err);
        alert("Failed to fetch tasks, please try again later.");  
      }
    };
    fetchTasks();
  },[])

  const getDueDate = (dueDate) =>{
    if(!dueDate) return "No Due Date";

    const date = dueDate.toDate ? dueDate.toDate() : new Date(dueDate);;
    if(isNaN(date)) return "Invalid date"

    const today = new Date(getToday());
    const tomorrow = new Date (getTomorrow());

    const isSameDate = (a,b)=>{
      return(
         a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate()
      ); 
    };

    if(isSameDate(date,today)) return "Today";
    if(isSameDate(date,tomorrow)) return "Tomorrow";
    if(date < today) return "Overdue";
    return date.toLocaleDateString();
  }


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
          {tasks.map((item, idx) => {
           
            return(

            <tr
              key={idx}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-black rounded-full"></div>
                <span className="font-medium">{item.task_name}</span>
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
                      ?"bg-[#F5E8C4]"
                      :"bg-gray-300"
                  }`}
                >
                  {item.priority}
                </span>
              </td>
              <td className="px-4 py-3">{item.description}</td>
              <td className="px-4 py-3 font-medium">{item.assign}</td>
            </tr>
            );
      })}
        </tbody>
      </table>
    </div>
  );
};

export default TaskDetails;
