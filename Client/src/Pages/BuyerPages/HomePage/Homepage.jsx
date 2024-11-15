import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./homepage.css";
import { Box, Container } from '@mui/material';
import HeroSection from './HeroSection';
import BrandLogos from './BrandLogos';
import Support from './Support';
import FeaturedProducts from './FeaturedProducts';
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyPayment } from "../../../redux/Actions/cartActions";
import { setFeedback } from "../../../redux/Actions/productActions";
import { setLoading } from "../../../redux/Actions/authActions";

const Homepage = ({ verifyPayment, setFeedback, setLoading }) => {
  const [searchParams] = useSearchParams();
  const effectRef = useRef(false);
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
  }, [searchParams, verifyPayment, navigate, setFeedback, setLoading]);


  return (
    <Container maxWidth="lg" className="homepage" sx={{pl: 0, pr: 0}}>
      <Box sx={{pl: 0, pr: 0}}>
        <HeroSection />
        <BrandLogos />
        <Support />
        <FeaturedProducts />
      </Box>
    </Container>
  );
}
Homepage.propTypes = {
  featuredProducts: PropTypes.array,
  products: PropTypes.array,
  verifyPayment: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    featuredProducts: state.product.featuredProducts,
    products: state.product.products,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, { verifyPayment, setFeedback, setLoading })(
  Homepage
);
