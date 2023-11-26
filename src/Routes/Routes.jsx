import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Signup/Signup";
import DetailedPost from "../Pages/DetailedPost/DetailedPost";
import Membership from "../Pages/Membership/Membership";
import Dashboard from "../Layout/Dashboard";
import Profile from "../Pages/Dashboard/Profile/Profile";
import AddPost from "../Pages/Dashboard/AddPost/AddPost";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "signup",
                element: <SignUp />
            },
            {
                path: "detailedPost",
                element: <DetailedPost />
            },
            {
                path: "membership",
                element: <Membership />
            },
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
            // Normal user routes
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'addPost',
                element: <AddPost />
            },
            // {
            //     path: 'payment',
            //     element: <Payment />
            // },
            // {
            //     path: 'userHome',
            //     element: <UserHome />
            // },

            // Admin only routes (conditionally rendered based on isAdmin)
            // {
            //     path: 'adminHome',
            //     element: isAdmin ? <AdminRoutes><AdminHome /></AdminRoutes> : <Navigate to="/dashboard/userHome" />
            // },
            // {
            //     path: 'addItems',
            //     element: isAdmin ? <AdminRoutes><AddItems /></AdminRoutes> : <Navigate to="/dashboard/userHome" />
            // },
            // {
            //     path: 'manageItems',
            //     element: isAdmin ? <AdminRoutes><ManageItems /></AdminRoutes> : <Navigate to="/dashboard/userHome" />
            // },
            // {
            //     path: 'updateItem/:id',
            //     element: isAdmin ? <AdminRoutes><UpdateItem /></AdminRoutes> : <Navigate to="/dashboard/userHome" />,
            //     loader: ({ params }) => fetch(`https://bistro-boss-server-lake-two.vercel.app/menu/${params.id}`)
            // },
            // {
            //     path: 'users',
            //     element: isAdmin ? <AdminRoutes><AllUsers /></AdminRoutes> : <Navigate to="/dashboard/userHome" />
            // },
        ]
    }

])