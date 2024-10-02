import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./homepage.css";
import Banner from "../../component/Banner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyPayment } from "../../redux/Actions/cartActions";
import { setFeedback } from "../../redux/Actions/productActions";
import Loader from "../../features/Loader";


const Homepage = ({verifyPayment, setFeedback}) => {
  const [searchParams] = useSearchParams();
  const effectRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
   
  useEffect(() => {
    if (!effectRef.current) {
      const query = new URLSearchParams(searchParams);
      const reference = query.get('reference');
      if (reference) {
        setLoading(true);
        verifyPayment(reference)
          .then((response) => {
            setFeedback(response); 
            setLoading(false);
            navigate('/profile?option=Orders');
          })
          .catch((error) => {
            setFeedback({error});
            setLoading(false);
            navigate('/profile?option=Orders');
          })
      }
      effectRef.current = true;
    }
  }, [searchParams, verifyPayment, navigate, setFeedback]);
  return (
    <div className="home">
      {loading && <Loader />}
      <Banner/>
    </div>
  );
};

Homepage.propTypes = {
  featuredProducts: PropTypes.array,
  products: PropTypes.array,
  verifyPayment: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    featuredProducts: state.product.featuredProducts,
    products: state.product.products,
  };
};

export default connect(mapStateToProps, {verifyPayment, setFeedback})(Homepage);