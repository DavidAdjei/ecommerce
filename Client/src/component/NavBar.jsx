import React from "react";
import { Link } from "react-router-dom";
import "./component.css";
import Logo from "../assets/images/Logo.jpeg";
import { IoPersonOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

export default function NavBar() {
  // const navigate = useNavigate();

  const handleSignUpClick = () => {
    console.log("Clicked");
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="left">
          <h1 className="nav_welcome">
            <Link to="/" className="nav_logo">
              <img src={Logo} alt="Logo" />
            </Link>
          </h1>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="right">
          <input
            className="search_input"
            type="text"
            placeholder="search..."
            autoCorrect="false"
            autoComplete="false"
          />
          <Link>
            <IoIosSearch size={30} className="search_button" />
          </Link>
          <Link to="/profile">
            <IoPersonOutline size={30} />
          </Link>
          <Link to="/cart">
            <IoCartOutline size={30} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
