import React from 'react'
import './App.css'
import Login from './Section/Login'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Dashboard from './Section/Dashboard'
import TaskDetails from './Components/TaskDetails'
import TaskCompleted from './Section/TaskCompleted'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/task' element={<TaskDetails/>} />
          <Route path='/completed' element={<TaskCompleted/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
