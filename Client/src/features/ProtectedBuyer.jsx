import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedBuyer = ({ isAuth, user }) => {
    const location = useLocation();

    if(!isAuth){
        return <Navigate to={`/login?page=${location.pathname}`} replace/>;
    }
    return user.role === "buyer" ? <Outlet/> : <Navigate to={`/`} /> 
}

ProtectedBuyer.propTypes = {
    isAuth: PropTypes.bool,
    user: PropTypes.shape({
        role: PropTypes.string.isRequired,
        registrationStep: PropTypes.number,
    }),
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user
})


export default connect(mapStateToProps, {})(ProtectedBuyer)