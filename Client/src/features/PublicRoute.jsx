import React from "react";
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const {isAuth} = useSelector((state) => state.auth);

    if(isAuth){
      return <Navigate to='/'/>
    }
  return <Outlet />;
};

export default PublicRoute;
