import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./component.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.imgs[0]} alt={product.title} />
        <h3>{product.title}</h3>
        <p>
          GH&#8373;
          {product.price}
        </p>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(ProductCard);
