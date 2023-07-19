import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoutesAuth() {
    return (
        localStorage.getItem("userToken") !==null ? <Navigate to='/home' /> : <Outlet/> 
      )
}

