import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedSeller = () => {
    const location = useLocation();
    const {user, isAuth} = useSelector(state => state.auth)

    if(!isAuth){
        return <Navigate to={`/login?page=${location.pathname}`} replace/>;
    }else if(isAuth && user.registrationStep !== 0){
      return <Navigate to={`/signUp?step=${user.registrationStep}&role=${user.role}`} replace/>;
    }else if(!isAuth && user.registrationStep !== 0){
      return <Navigate to={`/signUp?step=${user.registrationStep}&role=${user.role}`} replace/>;
    }
    return user.role === "seller" ? <Outlet/> : <Navigate to={`/`} /> 
}

ProtectedSeller.propTypes = {
  isAuth: PropTypes.bool,
  user: PropTypes.shape({
      role: PropTypes.string,
      registrationStep: PropTypes.number,
  }),
};

export default ProtectedSeller;