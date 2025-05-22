import React from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import TaskList from "../Components/Tasklist";
import Calendar from "react-calendar";
import Calender from "../Components/Calender";
const Dashboard = () => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex flex-col flex-1">
          <Navbar />

         


          <div className="p-6 overflow-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Calender</h2>
                    <Calender/>
                </div>


                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 ">My Tasks</h2>
                     <TaskList/>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
