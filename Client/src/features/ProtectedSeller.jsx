import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedSeller = ({ isAuth, user }) => {
    const location = useLocation();

    if(!isAuth){
        return <Navigate to={`/login?page=${location.pathname}`} replace/>;
    }else if(isAuth && user.registrationStep !== 0){
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

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user
})


export default connect(mapStateToProps, {})(ProtectedSeller)