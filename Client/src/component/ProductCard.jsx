import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./component.css";
import { addToCart } from "../redux/Actions/cartActions";
import { IoCartOutline } from "react-icons/io5";
import { setFeedback } from "../redux/Actions/productActions";

const ProductCard = ({ product, addToCart, setFeedback }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.imgs[0]} alt={product.title} />
        <p className="product-name">{product.title}</p>
      </Link>
      <p>
        GH&#8373;
        {product.price}
      </p>
      <button
        className="addToCartButton"
        onClick={() => {
          addToCart(product);
          setFeedback({ message: "Item Added" });
        }}
      >
        <IoCartOutline size={20} style={{ marginRight: "8" }} /> Add to cart
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addToCart, setFeedback })(ProductCard);
