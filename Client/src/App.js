import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/HomePage/Homepage";
import NavBar from "./component/NavBar";
import Footer from "./component/footer";
import {
  getProducts,
  setFeaturedProducts,
  setFeedback,
} from "./redux/Actions/productActions";
import { checkAuth } from "./redux/Actions/authActions";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/LogIn/LogIn";
import Loader from "./features/Loader";
import Feedback from "./features/Feedback";

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
