import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import TaskList from "../Components/Tasklist";
import Calender from "../Components/Calender";
import TaskDetails from "../Components/TaskDetails"; 
import TaskCompleted from "./TaskCompleted";
import { useLocation } from "react-router-dom";


const Dashboard = () => {
  // const [activeTab, setActiveTab] = React.useState("dashboard");
  const location = useLocation();

  const [selectedDate,setSelectedDate] = useState(()=>{
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const handleDateChange = (date) =>{
    const dateString = date.toLocaleDateString("en-CA");
    setSelectedDate(dateString)
    console.log(dateString)
  }
  
  const [searchQuery,setSearchQuery] = useState("");

  const path = location.pathname;
  let currentTab ="dashboard";
  if(path.startsWith("/task")) currentTab ="task";
  else if(path.startsWith("/completed")) currentTab ="completed"


  return (
    <>
      <div className="flex h-screen">
        {/* <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />  */}
        <Sidebar  /> 
        <div className="flex flex-col flex-1">
          <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <div className="p-6 overflow-auto">
            {currentTab === "dashboard" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Calender</h2>
                  <Calender value={new Date(selectedDate)} onChange={handleDateChange}/>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4 ">My Tasks</h2>
                  <TaskList selectedDate={selectedDate} searchQuery={searchQuery}  />
                </div>

                 
              </div>
            )}
            
            {currentTab === "task" && (
                <div className="bg-white p-4 rounded-lg shadow-lg">
                <TaskDetails />
              </div>
            )} 

            {currentTab === "completed" && (
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <TaskCompleted/>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
