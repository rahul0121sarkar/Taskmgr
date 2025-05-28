import React,{useEffect,useState} from 'react';
import { collection,query,where,getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { database } from '../database/firebase';
import { Timestamp } from 'firebase/firestore';
import { getToday,getTomorrow } from "../Utils/dateUtils";

const TaskList = ({selectedDate}) => {
  const [tasks,setTasks] = React.useState([]);
  const [loading,setLoading] = React.useState(true);

  useEffect(()=>{
    const fetchTask = async () =>{
      setLoading(true);

      try{
        const auth = getAuth();
        const user = auth.currentUser;

        if(!user || !selectedDate){
          setTasks([]);
          return;
        }

        const taskRef = collection(database,"tasks");

        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0,0,0,0);

        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23,59,59,999);

        const q = query(
          taskRef,
          where("userId", "==",user.uid),
          where("dueDate", ">=",Timestamp.fromDate(startOfDay)),
          where("dueDate", "<=",Timestamp.fromDate(endOfDay))
        );

        const querySnapshot = await getDocs(q);
        const taskList = querySnapshot.docs.map(doc =>({
          id:doc.id,
          ...doc.data()
        }));
        

        setTasks(taskList);
      }catch(error){
        console.error("Error in fetching the data:",error);
      }finally{
        setLoading(false);
      }

      
    };
        fetchTask();
      
  },[selectedDate])

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
  

  if (loading) return <div>Loading Task....</div>

  if(tasks.length === 0){
    return <div>No tasks for {selectedDate}</div>
  }

  return (
    <>
    <table className='min-w-full table-auto bg-gray-50 rounded-lg overflow-hidden shadow-md'>
      <thead className='text-left text-gray-700 text-sm font-semibold border-b'>
        <tr>
          <th className='px-4 py-3'>Tasks</th>
          <th className='px-4 py-3'>Due Date</th>
          <th className='px-4 py-3'>Stage</th>
        </tr>
      </thead>
      <tbody className='text-sm text-gray-700'>
        {tasks.map((item)=>(
          <tr key={item.id} className='border-t hover:bg-gray-50 transition'>
            <td className='px-4 py-3 flex items-center gap-2'>
              <div className='w-5 h-5 border-2 border-black rounded-full'></div>
              <span className='font-medium'>{item.task_name}</span>
            </td>

              <td className={`px-4 py-3 font-semibold ${
              getDueDate(item.dueDate) === "Today"
              ? "text-yellow-500"
              : getDueDate(item.dueDate) === "Tomorrow"
              ? "text-gray-500"
              :getDueDate(item.dueDate) === "Overdue"
              ? "text-red-500"
              :"text-black"
            }`}>
              {getDueDate(item.dueDate)}

            </td>
           
           <td className='px-4 py-3'>
              <span className='px-3 py-2 bg-amber-300 text-black text-xs font-bold rounded-full'>{item.stage}</span>
           </td>


          
          </tr>
        ))}
      </tbody>

    </table>
    {/* <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="p-3 rounded-md bg-amber-100 shadow text-black font-medium"
        >
          {task.task_name} <span className="text-sm text-gray-500">({task.stage})</span>
              
        </li>

      ))}
  
    </ul> */}
    </>
  );
};

export default TaskList;
