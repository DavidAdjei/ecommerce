import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import CartItem from "../../../component/CartItem";
import "./cart.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import { setFeedback } from "../../../redux/Actions/productActions";
import Loader from "../../../features/Loader";

export const Cart = ({ cart, user, setFeedback }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const calculateTot = () => {
    let total = 0;
    Object.values(cart).forEach((item) => {
      const price = item.quantity * item.product.price;
      total += price;
    });
    return total;
  };

  const handleProceed = () => {
    setLoading(true);
    if (!user) {
      setFeedback({ error: "You need to log in first" });
      const query = new URLSearchParams({
        page: "/cart",
      });
      setTimeout(() => {
        setLoading(false);
        navigate(`/login?${query.toString()}`);
      }, 2000);
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="cart-container">
      {Object.keys(cart).length === 0 ? (
        <p
          style={{
            fontSize: 18,
            textAlign: "center",
            fontWeight: 400,
            color: "gray",
          }}
        >
          Your cart is empty
        </p>
      ) : (
        <div>
          <Link to="/shop" className="back-button">
            <IoIosArrowRoundBack size={30} />
            Continue shopping
          </Link>

          <h2>Your Shopping Cart</h2>
          <div className="table-wrapper">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Details</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(cart).map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="cart-footer">
            <div className="subtotal">
              Subtotal: <strong>GH&#8373; </strong>
              {calculateTot().toFixed(2)}
            </div>
            <button className="proceed" onClick={handleProceed}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
      {loading && <Loader />}
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.object,
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  user: state.auth.user,
});

export default connect(mapStateToProps, { setFeedback })(Cart);
