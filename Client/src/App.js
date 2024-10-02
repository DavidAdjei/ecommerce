import PropTypes from "prop-types";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
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
import { checkAuth } from "./redux/Actions/authActions";

const Homepage = lazy(() => import("./Pages/HomePage/Homepage"));
const ProductsPage = lazy(() => import("./Pages/ProductsPage/ProductsPage"));
const ProductDetails = lazy(() => import("./Pages/ProductDetails/ProductDetails"));
const Cart = lazy(() => import("./Pages/Cart/Cart"));
const Contact = lazy(() => import("./Pages/Contact/Contact"));
const About = lazy(() => import("./Pages/About/About"));
const SignUp = lazy(() => import("./Pages/SignUp/SignUp"));
const Login = lazy(() => import("./Pages/LogIn/LogIn"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const Favourites = lazy(() => import( "./Pages/Favourites/Favourites"));
const Orders = lazy(() => import( "./Pages/Orders/Orders"));
const Address = lazy(() => import( "./Pages/Address/Address"));


const App = ({ getProducts, setFeaturedProducts, checkAuth, setFeedback, feedback }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((res) => {
      const popular = res.products.filter(product => product.popular === true);
      setFeaturedProducts(popular);
      checkAuth().then(() => {
        setLoading(false)
      }).catch(err => {
        setFeedback({ error: err });
        setLoading(false)
      });
    }).catch(err => {
      setFeedback({ error: err })
      checkAuth().then(() => {
        setLoading(false)
      }).catch(err => {
        setFeedback({ error: err });
        setLoading(false)
      });
    });
  },[getProducts, setFeaturedProducts, checkAuth, setFeedback])

  if (loading) {
    return (
      <Loader/>
    )
  }

  return (
    <div className="App">
      <NavBar />
      {feedback && <Feedback data={feedback} onClose={() => setFeedback(null)}/>}
      <div className="main">
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/shop" element={<ProductsPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/edit-address" element={<Address />} />
          </Routes>
        </Suspense> 
      </div>
      <Footer />
    </div>
  );
};

App.propTypes = {
  getProducts: PropTypes.func,
  setFeaturedProducts: PropTypes.func,
  setFeedback: PropTypes.func,
  feedback: PropTypes.object
};

const mapStateToProps = (state) => ({
  feedback: state.product.feedback
});

export default connect(mapStateToProps, { getProducts, setFeaturedProducts, checkAuth, setFeedback })(
  App
);
