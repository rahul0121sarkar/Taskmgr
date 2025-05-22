import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
// import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setActiveTab }) => {
  return (
    <>
    <div className='bg-white h-[94vh] w-56 flex flex-col m-4 rounded-4xl shadow-xl'>
      <div className='flex justify-center items-center gap-1 p-3 mb-2'>
        <div className="rounded-full bg-[#FAE150] text-black font-bold w-12 h-12 flex justify-center items-center border-2 border-black text-md">
          Xplor
        </div>
        <div>
          <h1 className='text-lg font-semibold text-black opacity-75'>Bizconnect Xplor</h1>
        </div>
      </div>

      <div className='flex items-center gap-3 mb-1 pl-3 h-10 bg-amber-200 cursor-pointer' onClick={() => setActiveTab("dashboard")}>
        <img src="./dashboard.png" alt="dashboard image" className='h-6 w-6' />
        <div>
          <h1 className='text-black text-lg font-semibold opacity-75'>Dashboard</h1>
        </div>
      </div>

      <div className='flex items-center gap-3 mb-1 pl-4 h-10 hover:bg-amber-200 duration-100 transition-all cursor-pointer'onClick={() => setActiveTab("task")}>
      <FontAwesomeIcon icon={faCircleCheck} className="text-black-400 " />
      <h1 className='text-black text-lg font-semibold opacity-75'>My Task</h1>
      </div>


    <div className='mt-auto flex items-center gap-2 mb-3 pl-4 h-10 hover:bg-amber-200 hover:rounded-b-2xl duration-100 transition-all cursor-pointer'>
     <FontAwesomeIcon icon={faRightFromBracket} className="text-black " />
      <h1 className='text-black text-lg font-semibold opacity-75' >Logout</h1>
      </div>

     
    </div>
    </>
  )

}

export default Sidebar
