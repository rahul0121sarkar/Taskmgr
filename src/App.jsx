import React from 'react'
import './App.css'
import Login from './Section/Login'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

import Dashboard from './Section/Dashboard'



const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
