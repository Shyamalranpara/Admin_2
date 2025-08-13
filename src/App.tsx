import React from 'react'
import Login from './Login/Login'
import Admin from './Admin/Admin'
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import AppLayout from './Layout/AppLayout';

const App = () => {
  const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", 
        element: <Dashboard /> 
      },
      { path: "/dashboard", 
        element: <Dashboard /> 
      },
      { path: "/admin", 
        element: <Admin /> 
      }
    ]
  }
]);

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App