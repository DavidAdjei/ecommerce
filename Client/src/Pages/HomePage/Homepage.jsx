import PropTypes from "prop-types";
import React from "react";

import { connect } from "react-redux";
import "./homepage.css";

import Banner from "../../component/Banner";
import Footer from "../../component/footer";

const Homepage = ({ featuredProducts }) => {
  return (
    <div className="home">
      <Banner />

      <div className="new-arrivals">
        <h1>New Arrivals</h1>
      </div>

      <Banner />
      <Banner />
      <Banner />
      <Footer />
    </div>
  );
};

Homepage.propTypes = {
  featuredProducts: PropTypes.array,
  products: PropTypes.array,
};

const mapStateToProps = (state) => {
  console.log("Redux state:", state);
  return {
    featuredProducts: state.product.featuredProducts,
    products: state.product.products,
  };
};

export default connect(mapStateToProps, {})(Homepage);
