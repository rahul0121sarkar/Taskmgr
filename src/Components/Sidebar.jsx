import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck,faRightFromBracket,faClipboardList } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../database/firebase';
import LoadingOverlay from './LoadingOverlay';



// const Sidebar = ({ activeTab,setActiveTab }) => {
const Sidebar = () => {
const [loading, setloading] = React.useState(false);
const navigate = useNavigate();
const location = useLocation();


const path = location.pathname;
let currentTab = 'dashboard';
if(path.startsWith('/task')) currentTab ='task';
else if(path.startsWith('/completed')) currentTab ='completed';  



const handleLogout = async()=>{
  try{
    setloading(true);
    await signOut(auth);
    alert("Logged out successfully!!");
    navigate("/");
  }
  catch(err){
    console.error("Logout failed:",err);
    alert("Logout faild,please try again later.");
  }finally{
    setloading(false);
  }
}

  return (
    <>
    {loading && <LoadingOverlay message='Logging out...'/>}
    <div className='bg-white h-[94vh] w-56 flex flex-col m-4 rounded-4xl shadow-xl'>
      <div className='flex justify-center items-center gap-1 p-3 mb-2'>
        <div className="rounded-full bg-[#FAE150] text-black font-bold w-12 h-12 flex justify-center items-center border-2 border-black text-md">
          Xplor
        </div>
        <div>
          <h1 className='text-lg font-semibold text-black opacity-75'>Bizconnect Xplor</h1>
        </div>
      </div>

      <div className={`flex items-center gap-3 mb-1 pl-3 h-10  cursor-pointer ${currentTab === "dashboard" ? "bg-amber-300" :"hover:bg-amber-200" }`} onClick={() => navigate("/dashboard")}>
        <img src="./dashboard.png" alt="dashboard image" className='h-6 w-6' />
        <div>
          <h1 className='text-black text-lg font-semibold opacity-75'>Dashboard</h1>
        </div>
      </div>

      <div className={`flex items-center gap-3 mb-1 pl-4 h-10 hover:bg-amber-200 duration-100 transition-all cursor-pointer ${currentTab === "task"?"bg-amber-300":"hover:bg-amber-200"} `}onClick={() => navigate("/task")}>
      <FontAwesomeIcon icon={faClipboardList} className='text-black' />
      <h1 className='text-black text-lg font-semibold opacity-75'>My Task</h1>
      </div>

      <div className={`flex items-center gap-3 mb-1 pl-4 h-10 hover:bg-amber-200 duration-100 transition-all cursor-pointer ${currentTab === "completed"?"bg-amber-300":"hover:bg-amber-200"} `}onClick={() => navigate("/completed")}>
     <FontAwesomeIcon icon={faCircleCheck} className="text-black-400 " />
      <h1 className='text-black text-lg font-semibold opacity-75'>Completed Task</h1>
      </div>


    <div className='mt-auto flex items-center gap-2 mb-3 pl-4 h-10 hover:bg-amber-200 hover:rounded-b-2xl duration-100 transition-all cursor-pointer'>
     <FontAwesomeIcon icon={faRightFromBracket} className="text-black " />
      <h1 className='text-black text-lg font-semibold opacity-75' onClick={handleLogout} >Logout</h1>
      </div>

     
    </div>
    </>
  )

}

export default Sidebar
