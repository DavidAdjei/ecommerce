import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const Protected = ({ children, isAuth }) => {
    const location = useLocation();
    return isAuth ? children : (
    <Navigate to={`/login?page=${location.pathname}`} replace/>
  )
}

Protected.propTypes = {
    isAuth: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
})


export default connect(mapStateToProps, {})(Protected)