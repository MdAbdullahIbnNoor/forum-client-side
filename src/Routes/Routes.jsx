import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import DetailedPost from "../Pages/DetailedPost/DetailedPost";
import Membership from "../Pages/Membership/Membership";
import Dashboard from "../Layout/Dashboard";
import Profile from "../Pages/Dashboard/Profile/Profile";
import AddPost from "../Pages/Dashboard/AddPost/AddPost";
import MyPost from "../Pages/Dashboard/MyPost/MyPost";
import Comments from "../Pages/Comments/Comments";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddAnnouncement from "../Pages/Dashboard/AddAnnouncement/AddAnnouncement";
import AdminRoutes from "../providers/AdminRoutes";
import ManageReports from "../Pages/Dashboard/ManageReports/ManageReports";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import SignUp from "../Pages/SignUp/SignUp";

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
                path: 'detailedPost/:id',
                element: <DetailedPost />,
                loader: ({ params }) => fetch(`https://forum-server-side.vercel.app/detailedPost/${params.id}`)
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
                path: 'myPost',
                element: <MyPost />
            },
            {
                path: 'addPost',
                element: <AddPost />
            },
            {
                path: 'comments/:postTitle', // New route for Comments page
                element: <Comments />
            },

            // Admin only routes (conditionally rendered based on isAdmin)
             {
                 path: 'adminHome',
                 element:<AdminRoutes><AdminHome /></AdminRoutes>
             },
             {
                 path: 'addAnnouncement',
                 element:<AdminRoutes><AddAnnouncement /></AdminRoutes>
             },
             {
                 path: 'manageReports',
                 element:<AdminRoutes><ManageReports /></AdminRoutes>
             },
             {
                 path: 'users',
                 element:<AdminRoutes><AllUsers /></AdminRoutes>
             }
        ]
    }

])