import React from 'react'
import './App.css'
import Login from './Section/Login'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Dashboard from './Section/Dashboard'
import TaskDetails from './Components/TaskDetails'
import TaskCompleted from './Section/TaskCompleted'
import Feedback from './Section/Feedback'
import Feedback2 from './Section/Feedback2'



const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/task' element={<TaskDetails/>} />
          <Route path='/completed' element={<TaskCompleted/>}/>
          <Route path ='/feedback' element={<Feedback/>}/>
          <Route path ='/feedback2' element={<Feedback2/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
