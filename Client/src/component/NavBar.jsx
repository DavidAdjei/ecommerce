import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./component.css";
import Logo from '../assets/images/Logo.jpeg';


export default function NavBar() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    console.log("Clicked")
  };

  return (
    <header className='header'>
      <nav className='nav'>
        <h1 className='nav_welcome'><Link to="/" className='nav_logo'><img src={Logo} alt="Logo" /></Link></h1>
          <div className='button_container'>
            <button>Cart</button>
            <button onClick={handleSignUpClick}>Sign Up</button>
            <button >Log In</button>
          </div>
      </nav>
      
    </header>
  );
}
