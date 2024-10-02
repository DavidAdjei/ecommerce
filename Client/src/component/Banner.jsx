import React from "react";
import Slider from "react-slick";
import "./component.css";
const BannerImage = require("../assets/images/iPhone-15-release-date-expectations-your-guide-to-potential-specs-features-and-pricing.jpg");
const BannerImage2 = require("../assets/images/PlayStation-5.jpg");
const BannerImage3 = require("../assets/images/iPhone-15-release-date-expectations-your-guide-to-potential-specs-features-and-pricing.jpg");

const Banner = () => {
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
    <div>
      <Slider {...settings}>
        <div className="banner">
          <button>Hello</button>
          <img src={BannerImage} alt="beauty" />
        </div>

        <div className="banner">
          <button>Hello</button>
          <img src={BannerImage2} alt="beauty" />
        </div>

        <div className="banner">
          <button>Hello</button>
          <img src={BannerImage3} alt="beauty" />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
