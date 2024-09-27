import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./component.css";
import { addToCart } from "../redux/Actions/cartActions";

const ProductCard = ({ product, selectedProduct }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.imgs[0]} alt={product.title} />
        <h3>{product.title}</h3>
      </Link>
      <p>
        GH&#8373;
        {product.price}
      </p>
      <button
        className="addToCartButton"
        onClick={() => {
          addToCart(selectedProduct);
        }}
      >
        ADD TO CART
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(ProductCard);
