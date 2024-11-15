import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./component.css";
import { addToCart } from "../redux/Actions/cartActions";
import { IoCartOutline } from "react-icons/io5";
import { setFeedback } from "../redux/Actions/productActions";
import { addToWishlist, removeFromWishlist } from "../redux/Actions/authActions";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useHistory for navigation
import { createOrNavigateToRoom } from "../redux/Actions/chatActions";
import io from 'socket.io-client';
const socket = io('http://localhost:8000');

const ProductCard = ({
  product,
  addToCart,
  setFeedback,
  addToWishlist,
  user,
  wishList,
  removeFromWishlist,
  createOrNavigateToRoom // Add this as a prop
}) => {
  const navigate = useNavigate(); // Initialize useHistory for navigation

  const isInWishlist = useMemo(() => {
    return user && wishList && wishList.some(p => p._id === product._id);
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

  // Handle chat with seller
  const handleChatWithSeller = () => {
    if (!user) {
      setFeedback({ error: "You need to login first" });
    } else {
      createOrNavigateToRoom(user._id, product.sellerId).then((res) => {
        socket.emit('joinRoom', { userId: user._id, roomId: res.roomId });
        navigate(`/chat/${res.roomId}`);
      });
    }
  };

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
        {user && (
          <button className="addToWishlistButton" onClick={ !isInWishlist ? handleAddToWish : handleRemove}>
            {isInWishlist ? (
              <FaHeart size={20} style={{ marginRight: "8px" }} color="red" />
            ) : (
              <FaRegHeart size={20} style={{ marginRight: "8px" }} color="red"/>
            )}
          </button>
        )}
        {/* Chat with Seller Button */}
        <button onClick={handleChatWithSeller} className="chatWithSellerButton">
          Chat with Seller
        </button>
      </div>
    </div>
  );
};


ProductCard.propTypes = {
  product: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  wishList: state.auth.wishList,
});

export default connect(mapStateToProps, {
  addToCart,
  setFeedback,
  addToWishlist,
  removeFromWishlist,
  createOrNavigateToRoom
})(ProductCard);
