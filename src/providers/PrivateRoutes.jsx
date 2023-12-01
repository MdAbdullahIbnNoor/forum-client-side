import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()

    if(loading) {
        return <span className="loading loading-dots loading-lg p-12 lg:m-[400px] lg:mx-[800px]"></span>
    }
    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
}

export default PrivateRoutes
