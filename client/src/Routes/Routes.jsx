import { createBrowserRouter } from 'react-router-dom'
import Main from '../Layouts/Main'
import Login from '../Pages/Auth/Login'
import Register from '../Pages/Auth/Register'
import Home from '../Pages/Home/Home'
import SendMoney from '../Pages/User/SendMoney'
import CashOut from '../Pages/User/CashOut'
import CashIn from '../Pages/Agent/CashIn'
import UserManagement from '../Pages/Admin/UserManagement'
import AgentApproval from '../Pages/Admin/AgentApproval'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
import AgentRoute from './AgentRoute'
import AdminDashboard from '../Pages/Admin/AdminDashboard'

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
                element: <PrivateRoute><SendMoney /></PrivateRoute>
            },
            {
                path: '/cashout',
                element: <PrivateRoute><CashOut /></PrivateRoute>
            },
            {
                path: '/cash-in',
                element: <AgentRoute><CashIn /></AgentRoute>
            },
            {
                path: '/users',
                element: <AdminRoute><UserManagement /></AdminRoute>
            },
            {
                path: '/agent-approval',
                element: <AdminRoute><AgentApproval /></AdminRoute>
            },
            {
                path: '/admin',
                element: <AdminRoute><AdminDashboard /></AdminRoute>
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