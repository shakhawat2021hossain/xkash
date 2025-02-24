import { createBrowserRouter } from 'react-router-dom'
import Main from '../Layouts/Main'
import Login from '../Pages/Auth/Login'
import Register from '../Pages/Auth/Register'
import Home from '../Pages/Home/Home'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <Home/>
            }
        ]
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
])