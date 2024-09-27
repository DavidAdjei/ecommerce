import PropTypes from "prop-types";
import React from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import "./homepage.css";

const BannerImage = require("../../assets/images/avocado_cut_in_half-wallpaper-3840x2160.jpg");
const BannerImage2 = require("../../assets/images/amazon-wallpaper-2560x1440.jpg");

const Homepage = ({ featuredProducts }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
  };

  return (
    <div className="home">
      <Slider {...settings}>
        {/* {featuredProducts?.length > 0 ? (
          featuredProducts?.map((product) => (
            <div key={product._id} className="slide">
              <img
                src={product.imgs[0]}
                alt={product.title}
                className="slide-image"
              />
              <div className="slide-content">
                <h2>{product.title}</h2>
                <p>Price: GHS{product.price}</p>
                <p>Rating: {product.rating} ⭐</p>
                <a href="/all-products" className="view-details-button">
                  View More
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No featured products available.</p>
        )} */}

        <div className="banner">
          <button>Hello</button>
          <img src={BannerImage} alt="beauty" />
        </div>

        <div className="banner">
          <button>Hello</button>
          <img src={BannerImage2} alt="beauty" />
        </div>
      </Slider>
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
