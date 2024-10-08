import PropTypes from "prop-types";
import React, { useEffect, useMemo } from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  getSelectedProduct,
  setFeedback,
} from "../../redux/Actions/productActions";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/Actions/authActions";

import { Rating } from "@mui/material";
import { addToCart } from "../../redux/Actions/cartActions";
import Loader from "../../features/Loader";
import { IoCartOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductDetails = ({
  getSelectedProduct,
  selectedProduct,
  addToCart,
  setFeedback,
  addToWishlist,
  user,
  wishList,
  removeFromWishlist,
  product,
}) => {
  const { id } = useParams();

  const isInWishlist = useMemo(() => {
    return user && wishList && wishList.some((p) => p._id === product._id);
  }, [user, product, wishList]);

  const handleAddToWish = () => {
    if (!user) {
      setFeedback({ error: "You need to login first" });
    } else {
      addToWishlist(user._id, product._id)
        .then((res) => setFeedback(res))
        .catch((error) => setFeedback({ error }));
    }
  };

  const handleRemove = () => {
    if (!user) {
      setFeedback({ error: "You need to login first" });
    } else {
      removeFromWishlist(user._id, product._id)
        .then((res) => setFeedback(res))
        .catch((error) => setFeedback({ error }));
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    getSelectedProduct(id).catch((err) => setFeedback({ error: err }));
  };

  if (!selectedProduct) return <Loader />;

  return (
    <div className="product-details">
      <div className="product-details-left">
        <h2>{selectedProduct?.title}</h2>
        <img src={selectedProduct?.imgs[0]} alt={selectedProduct?.title} />
        <p className="details-price">
          GH&#8373;
          {selectedProduct?.price}
        </p>
        <Rating
          readOnly
          value={selectedProduct.rating}
          size="large"
          precision={0.1}
        />

        <button
          className="addToCartButton"
          onClick={() => {
            addToCart(selectedProduct);
            setFeedback({ message: "Item Added" });
          }}
        >
          <IoCartOutline size={20} style={{ marginRight: "8" }} /> Add to cart
        </button>
      </div>
      <div className="product-details-right">
        <h3>Specifications</h3>
        <ul>
          {selectedProduct?.specs.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>

        {user && (
          <button
            className="addToWishlistButton"
            onClick={!isInWishlist ? handleAddToWish : handleRemove}
          >
            {isInWishlist ? (
              <FaHeart size={20} style={{ marginRight: "8px" }} color="red" />
            ) : (
              <FaRegHeart
                size={20}
                style={{ marginRight: "8px" }}
                color="red"
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  getSelectedProduct: PropTypes.func,
  addToCart: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    selectedProduct: state.product.selectedProduct,
  };
};

export default connect(mapStateToProps, {
  getSelectedProduct,
  addToCart,
  setFeedback,
  addToWishlist,
  removeFromWishlist,
})(ProductDetails);
