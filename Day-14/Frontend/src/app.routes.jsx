import { Routes,Route  } from 'react-router'
import { createBrowserRouter } from "react-router-dom";
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <h1>Jay Jay Shree Hit Harivansh, Welcome to the 4 layer architecture of react</h1>
    }

])