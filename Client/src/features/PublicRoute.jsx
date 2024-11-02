import React from "react";
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PublicRoute = ({ isAuth, user }) => {
    const location = useLocation();
    if (isAuth && user.role === "seller" && user.registrationStep === 0) {
        return <Navigate to="/" />;
    }
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  registrationStep: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user,
});

export default connect(mapStateToProps)(PublicRoute);
