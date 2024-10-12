import PropTypes from "prop-types";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./component/NavBar";
import Footer from "./component/footer";
import Loader from "./features/Loader";
import Feedback from "./features/Feedback";
import {
  getProducts,
  setFeaturedProducts,
  setFeedback,
} from "./redux/Actions/productActions";
import { checkAuth, getNotifications } from "./redux/Actions/authActions";
import Protected from "./features/Protected";

const Homepage = lazy(() => import("./Pages/HomePage/Homepage"));
const ProductsPage = lazy(() => import("./Pages/ProductsPage/ProductsPage"));
const ProductDetails = lazy(() =>
  import("./Pages/ProductDetails/ProductDetails")
);
const Cart = lazy(() => import("./Pages/Cart/Cart"));
const Contact = lazy(() => import("./Pages/Contact/Contact"));
const About = lazy(() => import("./Pages/About/About"));
const SignUp = lazy(() => import("./Pages/SignUp/SignUp"));
const Login = lazy(() => import("./Pages/LogIn/LogIn"));
const UserDashboard = lazy(() => import("./Pages/Profile/UserDashboard"));
const Favourites = lazy(() => import("./Pages/Favourites/Favourites"));
const Checkout = lazy(() => import("./Pages/Checkout/Checkout"));

const App = ({
  getProducts,
  setFeaturedProducts,
  checkAuth,
  setFeedback,
  feedback,
  cart,
  getNotifications
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((res) => {
        const popular = res.products.filter(
          (product) => product.popular === true
        );
        setFeaturedProducts(popular);
      })
      .catch((err) => {
        setFeedback({ error: err });
      }).finally(()=> {
        checkAuth()
          .then((res) => {
            setLoading(false);
            getNotifications(res.user._id).catch(error => setFeedback({error}));
          })
          .catch((err) => {
            setFeedback({ error: err });
            setLoading(false);
          });
      });
  }, [getProducts, setFeaturedProducts, checkAuth, setFeedback]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <NavBar />
      {feedback && (
        <Feedback data={feedback} onClose={() => setFeedback(null)} />
      )}
      <div className="main">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/shop" element={<ProductsPage />} />
            <Route
              path="/cart"
              element={
                <Protected>
                  {" "}
                  <Cart />{" "}
                </Protected>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <Protected>
                  {" "}
                  <UserDashboard />{" "}
                </Protected>
              }
            />
            <Route
              path="/checkout"
              element={
                Object.values(cart).length < 1 ? (
                  <Navigate to="/" />
                ) : (
                  <Protected>
                    {" "}
                    <Checkout />{" "}
                  </Protected>
                )
              }
            />
            <Route path="/favourites" element={<Favourites />} />
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
  setFeaturedProducts: PropTypes.func,
  setFeedback: PropTypes.func,
  feedback: PropTypes.object,
};

const mapStateToProps = (state) => ({
  feedback: state.product.feedback,
  cart: state.cart.cart,
});

export default connect(mapStateToProps, {
  getProducts,
  setFeaturedProducts,
  checkAuth,
  setFeedback,
  getNotifications
})(App);
