import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faStopwatch, faUser, faFlag,faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import { collection, addDoc, getDocs,Timestamp, setDoc ,doc} from "firebase/firestore";
import { database } from "../database/firebase";
import { getToday,getTomorrow} from "../Utils/dateUtils";
import { getAuth } from "firebase/auth";
import LoadingOverlay from "../Components/LoadingOverlay";
import { useNavigate } from "react-router-dom";


const TaskModal = ({ isOpen, onClose, setActiveTab,editingTask,onTaskUpdated,onTaskCreated }) => {
  const [users, setUsers] = React.useState([]);
  const [selectDate,setSelectDate] = React.useState("");  
  const [loading, setloading] = React.useState(false)
  const navigate = useNavigate();
  
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
    setloading(true);
    try {

      const auth = getAuth();
      const currentUser = auth.currentUser;

      if(!currentUser){
        alert("User should logged in to create a task");
        return;
      }


  if(!task.assign?.uid || !task.assign?.username ){
    alert("Invalid assigne selected")
    setloading(false);
    return;
  }


     const payload ={
        task_name:task.task_name,
        stage:task.stage,
        priority:task.priority,
        assign:task.assign,
        description:task.description,
        dueDate:task.dueDate instanceof Date ? Timestamp.fromDate(task.dueDate) :null,
        // createdAt:Timestamp.fromDate(new Date()),
        userId:currentUser.uid
     }

    
      if(editingTask){
        const taskRef = doc(database,"tasks",editingTask.id);
        await setDoc(taskRef,{...payload,createdAt:editingTask.createdAt});
        onTaskUpdated({id:editingTask.id,...payload,createdAt:editingTask.createdAt});
      }else{
        await addDoc(collection(database,"tasks"),{
          ...payload,
          createdAt:Timestamp.fromDate(new Date()),
        });

      
      }
      alert(`Task ${editingTask ? "updated" : "added"} successfully!!  `);
      // navigate("/task")
      onTaskCreated?.();
      setTask({
        task_name:"",
        dueDate:"",
        stage:"",
        priority:"",
        assign:"",
        description:""
      });
      onClose();
      setActiveTab("task");
    } 
    catch (err) {
      console.error("Error adding task:", err);
    }finally{
      setloading(false)
    }
  }

  React.useEffect(() => {
    const fetchUsers = async () => {
     try {
    const userRef = collection(database, "users");
    const querySnapshot = await getDocs(userRef);
    const userData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,         // Firestore document ID
        uid: data.uid,      // Firebase Auth UID
        username: data.username,
      };
    });
    setUsers(userData);
  }  catch (err) {
        console.error("Error fetching users:", err);
        alert("Failed to fetch users, please try again later.");
      }
    };
    if (isOpen) {
      fetchUsers();

      let dueDate = editingTask?.dueDate instanceof Timestamp
      ?editingTask.dueDate.toDate()
      :editingTask?.dueDate || "";

      const todayStr = getToday().toDateString();
      const tomorrowStr = getTomorrow().toDateString();
      const dueDateStr = dueDate instanceof Date?dueDate.toDateString():"";


      let selected ="";
      if(dueDateStr === todayStr){
        selected ="today";
      }else if (dueDateStr === tomorrowStr){
        selected="tomorrow";
      }else if (dueDateStr){
        selected ="custom";
      }

     setTask({
      task_name:editingTask?.task_name|| "",
      dueDate,
      stage:editingTask?.stage||"",
      priority:editingTask?.priority|| "",
      assign:editingTask?.assign|| "",
      description:editingTask?.description||"",
    });
    setSelectDate(selected);
    }

  }, [isOpen,editingTask]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-xs">
      {loading && <LoadingOverlay message="adding task..."/>}
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
              className="absolute top-6 right-6 text-gray-500 cursor-pointer"
              onClick={onClose}
            >
                <FontAwesomeIcon icon={faCircleXmark} style={{fontSize:"28px"}} />
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
              Tomorrow
            </button>

            
           
            <input type="date" className={`bg-gray-300 w-8 px-2 py-1 rounded-md text-sm hover:bg-yellow-100 hover:cursor-pointer ${
              selectDate === "custom" ? "bg-yellow-200":""}`}
                onChange={(e) => {
                 const customDate = new Date(e.target.value);
                 if(!isNaN(customDate)){
                   setTask({ ...task, dueDate: customDate });
                    setSelectDate("custom");
                 } 
                }}
                value={
                  task.dueDate instanceof Date ? task.dueDate.toISOString().substring(0,10):""
                }
            />
            
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
              className="text-gray-500 ml-16"
              value={task.assign?.username || ""}
              onChange={(e) => {
                const selectedUser = users.find((u) => u.username === e.target.value);
                setTask((prev) => ({
                  ...prev,
                  assign: selectedUser
                    ? { uid: selectedUser.uid, username: selectedUser.username }
                    : "",
                }));
              }}
            >
              <option value="">+ Add Assignee</option>
              {users.map((user) => (
                <option key={user.uid} value={user.username}>
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
            {editingTask ? "update Task":"Add task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
