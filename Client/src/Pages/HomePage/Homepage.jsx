import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import "./homepage.css";
import Banner from "../../component/Banner";

const Homepage = (props) => {
  return (
    <div className="home">
      <Banner/>
    </div>
  );
};

Homepage.propTypes = {
  featuredProducts: PropTypes.array,
  products: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    featuredProducts: state.product.featuredProducts,
    products: state.product.products,
  };
};

export default connect(mapStateToProps, {})(Homepage);