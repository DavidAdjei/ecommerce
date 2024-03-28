import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./component.css";
import Logo from '../assets/images/Logo.jpeg';
import { useUser } from '../context/userContext';
import ShoppingCart from './cart';
import { useCart } from '../context/cartContext';


export default function NavBar() {
  const { user, logout } = useUser();
  const {handleCartClick, isCartOpen} = useCart();
  const navigate = useNavigate();
  

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <header className='header'>
      <nav className='nav'>
        <h1 className='nav_welcome'><Link to="/" className='nav_logo'><img src={Logo} alt="Logo" /></Link></h1>
        {user && user.role === "Admin" ? (
          <div className='button_container'>
            <button onClick={logout}>Logout</button>
            <button onClick={() => navigate("/admin")}>Admin</button>
            <button onClick={handleCartClick}>Cart</button>
          </div>
        ) : user ? (
          <div className='button_container'>
            <button onClick={handleCartClick}>Cart</button>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className='button_container'>
            <button onClick={handleCartClick}>Cart</button>
            <button onClick={handleSignUpClick}>Sign Up</button>
            <button onClick={() => navigate('/signin')}>Log In</button>
          </div>
        )}
        {isCartOpen && (
              <ShoppingCart/>
          )}
      </nav>
      
    </header>
  );
}
