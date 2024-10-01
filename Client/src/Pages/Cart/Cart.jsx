import PropTypes from "prop-types";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import CartItem from "../../component/CartItem";
import "./cart.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import { placeOrder } from "../../redux/Actions/cartActions";

export const Cart = ({ cart, placeOrder, user }) => {
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

  const submitOrder = () => {
    if (!user) {
      alert("You need to log in first");
      const query = new URLSearchParams({
        page: "/cart",
      });
      navigate(`/login?${query.toString()}`);
    } else {
      placeOrder(user._id, cart)
        .then((res) => {
          console.log(res);
          window.location.href = res?.data?.authorization_url;
        })
        .catch((err) => console.log(err));
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
              Subtotal: <strong>GHS </strong>
              {calculateTot().toFixed(2)}
            </div>
            <button className="checkout" onClick={submitOrder}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
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

export default connect(mapStateToProps, { placeOrder })(Cart);
