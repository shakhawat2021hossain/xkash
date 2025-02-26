import { createBrowserRouter } from 'react-router-dom'
import Main from '../Layouts/Main'
import Login from '../Pages/Auth/Login'
import Register from '../Pages/Auth/Register'
import Home from '../Pages/Home/Home'
import SendMoney from '../Pages/User/SendMoney'
import CashOut from '../Pages/User/CashOut'
import CashIn from '../Pages/Agent/CashIn'
import UserManagement from '../Pages/Admin/UserManagement'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/send-money',
                element: <SendMoney />
            },
            {
                path: '/cashout',
                element: <CashOut />
            },
            {
                path: '/cash-in',
                element: <CashIn />
            },
            {
                path: '/users',
                element: <UserManagement />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
])