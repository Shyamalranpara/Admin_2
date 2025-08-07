import React from 'react'
import Login from './Login'
import Admin from './Admin'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/admin' element={<Admin/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App