import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import TaskList from "../Components/Tasklist";
import Calender from "../Components/Calender";
import TaskDetails from "../Components/TaskDetails"; 

const Dashboard = () => {
  const [activeTab, setActiveTab] = React.useState("dashboard");

  const [selectedDate,setSelectedDate] = useState(()=>{
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const handleDateChange = (date) =>{
    const dateString = date.toLocaleDateString("en-CA");
    setSelectedDate(dateString)
    console.log(dateString)
  }
  

  return (
    <>
      <div className="flex h-screen">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} /> 
        <div className="flex flex-col flex-1">
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="p-6 overflow-auto">
            {activeTab === "dashboard" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Calender</h2>
                  <Calender value={new Date(selectedDate)} onChange={handleDateChange}/>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4 ">My Tasks</h2>
                  <TaskList selectedDate={selectedDate}  />
                </div>
              </div>
            ) : (
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <TaskDetails />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
