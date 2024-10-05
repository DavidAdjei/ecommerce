import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./component.css";
import { addToCart } from "../redux/Actions/cartActions";
import { IoCartOutline } from "react-icons/io5";
import { setFeedback } from "../redux/Actions/productActions";
import { addToWishlist } from "../redux/Actions/authActions";

const ProductCard = ({ product, addToCart, setFeedback, addToWishlist, user }) => {
  const handleAddToWish = () => {
    if (!user) {
      setFeedback({ error: "You need to login first" });
    } else {
      addToWishlist(user._id, product._id)
        .then(res => setFeedback(res))
        .catch(error => setFeedback({ error }))
    }
  }
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
      <div className="productsButtons">
        <button
          className="addToCartButton"
          onClick={() => {
            addToCart(product);
            setFeedback({ message: "Item Added" });
          }}
        >
          <IoCartOutline size={20} style={{ marginRight: "8" }} /> Add to cart
        </button>
        {
          user && (
            <button
              className="addToWishlistButton"
              onClick={handleAddToWish}
            >
              <IoCartOutline size={20} style={{ marginRight: "8" }} /> Add to wishlist
            </button>
          )
        }
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { addToCart, setFeedback, addToWishlist })(ProductCard);
