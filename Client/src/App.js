import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import { checkAuth, setLoading } from "./redux/Actions/authActions";
import GuestApp from "./Routes/GuestApp";
import BuyerApp from "./Routes/BuyerApp";
import SellerApp from "./Routes/SellerApp";
import Loader from "./features/Loader";

const App = ({
    setLoading,
    loading,
    checkAuth,
    isAuth, 
    user
}) => {
    const navigate = useNavigate();

    useEffect(() => {
        const initializeApp = async () => {
            try {
                await checkAuth();
            } catch (err) {
                if (err === "Registration Incomplete") {
                    navigate('/signUp?step=2&role=seller');
                }
            } finally {
                setLoading(false);
            }
        };

        initializeApp();
    }, [ setLoading, checkAuth, navigate]);

    if (loading) return <Loader />;

    if (!isAuth) {
        return <GuestApp />;
    }

    switch (user.role) {
        case "buyer":
            return <BuyerApp />;
        case "seller":
            return <SellerApp />;
        default:
            return <Navigate to="/login" />;
    }
};

App.propTypes = {
    checkAuth: PropTypes.func,
    setLoading: PropTypes.func,
    loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    isAuth: state.auth.isAuth,
    user: state.auth.user,
});

export default connect(mapStateToProps, {
    checkAuth,
    setLoading
})(App);
