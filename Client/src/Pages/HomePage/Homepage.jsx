import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./homepage.css";
import Banner from "../../component/Banner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyPayment } from "../../redux/Actions/cartActions";
import { setFeedback } from "../../redux/Actions/productActions";
import Loader from "../../features/Loader";

import { BsShieldLock } from "react-icons/bs";
import { BsTruck } from "react-icons/bs";
import { GrRotateLeft } from "react-icons/gr";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const Homepage = ({ verifyPayment, setFeedback }) => {
  const [searchParams] = useSearchParams();
  const effectRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!effectRef.current) {
      const query = new URLSearchParams(searchParams);
      const reference = query.get("reference");
      if (reference) {
        setLoading(true);
        verifyPayment(reference)
          .then((response) => {
            setFeedback(response);
            setLoading(false);
            navigate("/profile?option=Orders");
          })
          .catch((error) => {
            setFeedback({ error });
            setLoading(false);
            navigate("/profile?option=Orders");
          });
      }
      effectRef.current = true;
    }
  }, [searchParams, verifyPayment, navigate, setFeedback]);
  return (
    <div className="home">
      {loading && <Loader />}
      <Banner />

      <div className="support">
        <div className="support-card">
          <BsTruck size={30} style={{ marginBottom: "10" }} />
          <h4>Nationwide Delivery</h4>
          <p>Delivery done across the whole nation</p>
        </div>
        <div className="support-card">
          <BsShieldLock size={30} style={{ marginBottom: "10" }} />
          <h4>Secure Payment</h4>
          <p>Payments are secured</p>
        </div>
        <div className="support-card">
          <TfiHeadphoneAlt size={30} style={{ marginBottom: "10" }} />
          <h4>24/7 Customer Support</h4>
          <p>Payments are secured</p>
        </div>

        <div className="support-card">
          <GrRotateLeft size={30} style={{ marginBottom: "10" }} />
          <h4>Free Returns</h4>
          <p>Free returns within specified period</p>
        </div>
      </div>
    </div>
  );
};

Homepage.propTypes = {
  featuredProducts: PropTypes.array,
  products: PropTypes.array,
  verifyPayment: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    featuredProducts: state.product.featuredProducts,
    products: state.product.products,
  };
};

export default connect(mapStateToProps, { verifyPayment, setFeedback })(
  Homepage
);
