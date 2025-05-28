import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faStopwatch, faUser, faFlag,faCalendarDays} from "@fortawesome/free-solid-svg-icons";
import { collection, addDoc, getDocs,Timestamp } from "firebase/firestore";
import { database } from "../database/firebase";
import { getToday,getTomorrow} from "../Utils/dateUtils";
import { getAuth } from "firebase/auth";


const TaskModal = ({ isOpen, onClose, setActiveTab }) => {
  const [users, setUsers] = React.useState([]);
  const [selectDate,setSelectDate] = React.useState("");
  

  
  const [task, setTask] = React.useState({
    task_name: "",
    dueDate:"",
    stage: "",
    priority: "",
    assign: "",
    description: "",
  });

  function handleChange(e) {
    let { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  }


  async function addTask(e) {
    e.preventDefault();
    try {

      const auth = getAuth();
      const currentUser = auth.currentUser;

      if(!currentUser){
        alert("User should logged in to create a task");
        return;
      }

      await addDoc(collection(database, "tasks"), {
        task_name: task.task_name,
        stage: task.stage,
        priority: task.priority,
        assign: task.assign,
        description: task.description,
        dueDate: task.dueDate instanceof Date ? Timestamp.fromDate(task.dueDate) : null,
        createdAt: Timestamp.fromDate(new Date()),
        userId:currentUser.uid
    });
    
      alert("Task has been added successfully !!");
      setTask({
        task_name: "",
        dueDate:"",
        stage: "",
        priority: "",
        assign: "",
        description: "",
      });
      onClose();
      setActiveTab("task");
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Failed to add task, please try again later.");
    }
  }

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userRef = collection(database, "users");
        const querySnapshot = await getDocs(userRef);
        const userData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userData);
      } catch (err) {
        console.error("Error fetching users:", err);
        alert("Failed to fetch users, please try again later.");
      }
    };
    if (isOpen) {
      fetchUsers();

     setTask({
      task_name: "",
      dueDate: "",
      stage: "",
      priority: "",
      assign: "",
      description: "",
    });
    setSelectDate("");
    }

  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 ">
      <div className="bg-[#F7F5F4] rounded-xl p-6 w-[500px] shadow-lg relative">
        <div className="flex justify-between items-center ">
          <div>
            <FontAwesomeIcon
              icon={faListCheck}
              className="absolute top-8 left-10"
            />
          </div>
          <div>
            <input
              type="text"
              name="task_name"
              placeholder="Name of Task"
              className="w-80 mb-4 px-4 py-1 rounded-2xl text-sm focus:outline-none bg-white"
              value={task.task_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              className="absolute top-6 right-10 text-gray-500 cursor-pointer"
              onClick={onClose}
            >
              X
            </button>
          </div>
        </div>

        <div className="mb-4 space-y-4">
          <div className="flex gap-4 items-center">
            <FontAwesomeIcon icon={faStopwatch} className="opacity-60" />
            <span className="font-medium">Days</span>
            <button className={`bg-gray-300 px-3 py-1 rounded-full hover:bg-yellow-100 ml-22 hover:cursor-pointer ${selectDate === "today" ? "bg-yellow-200":"bg-gray-200"}`}
            onClick={() => {
                     setTask({ ...task, dueDate: new Date(getToday()) });
                     setSelectDate("today");
            }}
            >
              Today
            </button>
           <button className={`bg-gray-300 px-3 py-1 rounded-full hover:bg-yellow-100 hover:cursor-pointer ${selectDate === "tomorrow" ? "bg-yellow-200":"bg-gray-200"}`}
            onClick={() => {
                     setTask({ ...task, dueDate: new Date(getTomorrow()) });
                     setSelectDate("tomorrow");
            }}
            >
              Tommorow
            </button>

            
           
            <input type="date" className={`bg-gray-300 w-8 px-2 py-1 rounded-md text-sm hover:bg-yellow-100 hover:cursor-pointer ${selectDate === "custom" ? "bg-yellow-200":"bg-gray-200"}`}
                onChange={(e) => {
                setTask({ ...task, dueDate: new Date(e.target.value) });
                 setSelectDate("custom");
                }}
            />
            
{/* 
            {showDateInput && (
            <input type="date" className="bg-gray-300 w-8 px-2 py-1 rounded-md text-sm hover:cursor-pointer"
                onChange={(e) => {
                setTask({ ...task, dueDate: new Date(e.target.value) });
                 setSelectDate("custom");
                }}
            />
            )} */}

            {/* <button className="text-gray-500 hover:cursor-pointer" onClick={()=>setShowDateInput((prev)=>!prev)}>+</button> */}
          </div>

          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faFlag} className="opacity-60" />
            <span className="font-medium">Stage</span>
            <select
              name="stage"
              className="text-gray-500 hover:cursor-pointer ml-20 "
              value={task.stage}
              onChange={handleChange}
            >
              <option value="">+ Add Stage</option>
              <option value="inprogress">In progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faFlag} className="opacity-60" />
            <span className="font-medium">Priority</span>
            <select
              name="priority"
              className="text-gray-500 hover:cursor-pointer ml-17"
              value={task.priority}
              onChange={handleChange}
            >
              <option value="">+ Add Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex items-center gap-4 ">
            <FontAwesomeIcon icon={faUser} className="opacity-60" />
            <span className="font-medium pr-2">Assign</span>
            <select
              name="assign"
              className="text-gray-500 hover:cursor-pointer ml-16"
              value={task.assign}
              onChange={handleChange}
            >
              <option value="" className="">+ Add Assigne</option>
              {users.map((user) => (
                <option key={user.id} value={user.username}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <span className="font-medium pb-2">Description</span>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="my task details...."
              className="w-full bg-white rounded-lg h-24 p-3 border focus:outline-none mb-4"
            ></textarea>
          </div>

          <button
            className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-4 py-1 rounded-xl float-right border-3 hover:cursor-pointer"
            onClick={addTask}
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
