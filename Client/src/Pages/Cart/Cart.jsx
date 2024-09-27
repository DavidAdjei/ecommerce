import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import CartItem from "../../component/CartItem";
import "./cart.css";

export const Cart = ({ cart }) => {
  const navigate = useNavigate();

  const calculateTot = () => {
    let total = 0;
    Object.values(cart).forEach((item) => {
      const price = item.quantity * item.product.price;
      total += price;
    });
    return total;
  };

  // if (Object.values(cart).length === 0) {
  //     return <p>Cart is empty</p>;
  // }

  return (
    <div className="cart-container">
      <button className="back-button" onClick={() => navigate("/all-products")}>
        Back to Shop
      </button>
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
          Subtotal: <strong>GHS </strong>
          {calculateTot().toFixed(2)}
        </div>
        <button className="checkout">Proceed to Checkout</button>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.object,
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

export default connect(mapStateToProps, {})(Cart);
