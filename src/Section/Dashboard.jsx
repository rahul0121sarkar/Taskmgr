import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import TaskList from "../Components/Tasklist";
import Calender from "../Components/Calender";
import TaskDetails from "../Components/TaskDetails"; 

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <>
      <div className="flex h-screen">
        <Sidebar setActiveTab={setActiveTab} /> 
        <div className="flex flex-col flex-1">
          <Navbar />

          <div className="p-6 overflow-auto">
            {activeTab === "dashboard" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Calender</h2>
                  <Calender />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4 ">My Tasks</h2>
                  <TaskList />
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
