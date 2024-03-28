import React, { useState} from 'react';
import { useCart } from '../context/cartContext';
import { useUser } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

function ShoppingCart() {
  const [locationName, setLocationName] = useState('');
  const { cartContent, removeFromCart, handleCartClick, increment, decrement, handleOrderSubmit, proceed, setProceed } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const onProceedClick = () => {
    if (user) {
      setProceed(true);
    } else {
      alert('You need to sign in first');
      handleCartClick();
      navigate('/signin');
    }
  };

  const handleDeliveryAddressChange = (event) => {
    setLocationName(event.target.value);
  };


  return (
    <div className='cart'>
      <div className='cart_head'>
        <h2>Shopping Cart</h2>
        <button onClick={handleCartClick} title='Close Cart'>X</button>
      </div>
      <table className='cart_orders'>
        <tbody>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Number</th>
            <th>Unit Price</th>
            <th>Remove</th>
            <th>Total Price</th>
          </tr>
          {Object.values(cartContent).map((item) => (
            <tr key={item.id} className='cart_orders-item'>
              <td className='item_image'>
                <img src={item.image} alt="" />
              </td>
              <td>{item.name}</td>
              <td className='order_quantity'>
                <button onClick={() => increment(item.id)}>+</button>
                <p>{item.numberOfItems}</p>
                <button onClick={() => decrement(item.id, item.numberOfItems)}>-</button>
              </td>
              <td>GH₵{item.unitPrice}</td>
              <td>
                <button onClick={() => handleRemoveFromCart(item.id)} >Remove</button>
              </td>
              <td>
                <p>GH₵{item.grandPrice}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='submit_order'>
        <button onClick={onProceedClick}>Proceed</button>
      </div>
      {proceed &&
        <div className='orderConfirmation'>
          <ul>
            {Object.values(cartContent).map((item) => (
              <li key={item.id}>{item.name} {item.numberOfItems} at {item.grandPrice}</li>
            ))}
          </ul>
          <form>
            <label htmlFor="location">Enter Your Address</label>
            <input type='text' value={locationName} onChange={handleDeliveryAddressChange} />
          </form>
          <button onClick={() => handleOrderSubmit(user, locationName)}>Submit Order</button>
        </div> 
      }
    </div>
  );
}
export default ShoppingCart;
