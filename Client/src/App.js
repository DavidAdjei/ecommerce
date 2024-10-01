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


const App = ({ getProducts, setFeaturedProducts, checkAuth, setFeedback, feedback }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    getProducts().then((res) => {
      const popular = res.products.filter(product => product.popular === true);
      setFeaturedProducts(popular);
      setLoading(false)
    }).catch((err => setFeedback({error: err})));
    checkAuth().catch(err => console.log(err));
  },[getProducts, setFeaturedProducts, checkAuth, setFeedback])
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
            <Route path="/login" element={<Login/>} />
          </Routes>
        </Suspense> 
      </div>
      <Footer />
      {loading && <Loader />}
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
