import React from 'react'
import Login from './Login'
import Admin from './Admin'
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
    </div>
  )
}

export default App