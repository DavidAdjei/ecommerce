import PropTypes from "prop-types";
import React, { useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./component/NavBar";
import Footer from "./component/footer";
import Loader from "./features/Loader";
import Feedback from "./features/Feedback";

import ProtectedBuyer from "./features/ProtectedBuyer";
import ProtectedSeller from "./features/ProtectedSeller";
import PublicRoute from "./features/PublicRoute";
import { getProducts, getSellerProducts, setFeedback } from "./redux/Actions/productActions";
import { checkAuth, getNotifications, setLoading } from "./redux/Actions/authActions";

// Lazy-loaded components
const Homepage = lazy(() => import("./Pages/HomePage/Homepage"));
const ProductsPage = lazy(() => import("./Pages/ProductsPage/ProductsPage"));
const ProductDetails = lazy(() => import("./Pages/ProductDetails/ProductDetails"));
const Cart = lazy(() => import("./Pages/Cart/Cart"));
const Contact = lazy(() => import("./Pages/Contact/Contact"));
const About = lazy(() => import("./Pages/About/About"));
const SignUp = lazy(() => import("./Pages/SignUp/SignUp"));
const Login = lazy(() => import("./Pages/LogIn/LogIn"));
const UserDashboard = lazy(() => import("./Pages/Profile/UserDashboard"));
const Checkout = lazy(() => import("./Pages/Checkout/Checkout"));
const Dashboard = lazy(() => import("./Pages/Seller/Dashboard"));

const App = ({
  setLoading,
  loading,
  checkAuth,
  setFeedback,
  feedback,
  cart,
  getNotifications,
  getSellerProducts,
  getProducts,
}) => {
  useEffect(() => {
    checkAuth()
      .then((res) => {
        getNotifications(res.user._id).catch((error) => setFeedback({ error }));
        if (res.user.role.toLowerCase() === "buyer") {
          getProducts().catch((err) => setFeedback({ error: err }));
        } else {
          getSellerProducts(res.user._id).catch((err) => setFeedback({ error: err }));
        }
        setLoading(false);
      })
      .catch((err) => {
        getProducts().catch((err) => setFeedback({ error: err }));
        setFeedback({ error: err });
        setLoading(false);
      });
  }, [getProducts, getSellerProducts, setLoading, checkAuth, setFeedback]);

  if (loading) return <Loader />;

  return (
    <div className="App">
      <NavBar />
      {feedback && <Feedback data={feedback} onClose={() => setFeedback(null)} />}
      <div className="main">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" exact element={<Homepage />} />

            {/* Protected Buyer Routes */}
              <Route element={<ProtectedBuyer />}>
                <Route path="/profile" element={<UserDashboard />} />
                <Route
                  path="/checkout"
                  element={Object.values(cart).length < 1 ? <Navigate to="/" /> : <Checkout />}
                />
              </Route>

            {/* Protected Seller Routes */}
              <Route element={<ProtectedSeller />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>

            {/* Public Routes */}
            <Route element={<PublicRoute />}>
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Route>
            
            <Route path="/shop" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

App.propTypes = {
  getProducts: PropTypes.func,
  getNotifications: PropTypes.func,
  setFeedback: PropTypes.func,
  feedback: PropTypes.object,
  loading: PropTypes.bool,
  cart: PropTypes.object,
};

const mapStateToProps = (state) => ({
  feedback: state.product.feedback,
  cart: state.cart.cart,
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getSellerProducts,
  getProducts,
  checkAuth,
  setFeedback,
  getNotifications,
  setLoading,
})(App);
