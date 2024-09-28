import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import {
  decrement,
  increment,
  removeFromCart,
} from "../redux/Actions/cartActions";
import { FaRegTrashAlt } from "react-icons/fa";

const CartItem = ({ item, increment, decrement, removeFromCart }) => {
  const decrease = () => {
    if (item.quantity > 1) {
      decrement(item.product._id);
    }
  };

  const increse = () => {
    if (item.quantity < item.product.inStock) {
      increment(item.product._id);
    }
  };

  return (
    <tr className="cart-item">
      <td className="item-image">
        <img src={item.product.imgs[0]} alt={item.product.title} />
      </td>
      <td className="item-details">
        <p>{item.product.title}</p>
      </td>
      <td className="item-brand">
        <p>
          {item.product.Brand
            ? item.product.Brand
            : item.product.Genre
            ? item.product.Genre
            : item.product.For
            ? item.product.For
            : item.product.Type}
        </p>
      </td>
      <td className="item-qty">
        <button onClick={decrease}>-</button>
        <span style={{ fontSize: 14 }}>{item.quantity}</span>
        <button onClick={increse}>+</button>
      </td>
      <td className="item-price">
        <p>GHS {(item.product.price * item.quantity).toFixed(2)}</p>
      </td>
      <td className="remove">
        <button
          onClick={() => removeFromCart(item.product._id)}
          className="remove-item"
        >
          <FaRegTrashAlt size={20} />
        </button>
      </td>
    </tr>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
  increment: PropTypes.func,
  decrement: PropTypes.func,
  removeFromCart: PropTypes.func,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  increment,
  decrement,
  removeFromCart,
})(CartItem);
