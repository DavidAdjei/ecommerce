import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import "./component.css";
import Logo from "../assets/images/Logo.jpeg";
import { IoPersonOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import Button from "@mui/material/Button";
import Notifications from "./Notifications";

function NavBar({ isAuth }) {
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState(new URLSearchParams());
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    const query = new URLSearchParams({
      searchKeyword: keyword,
    });
    setQuery(query);
  };

  const handleLogin = () => {
    const query = new URLSearchParams({
      page: location.pathname,
    });
    navigate(`/login?${query.toString()}`);
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="left">
          <h1 className="nav_welcome">
            <NavLink activeClassName="active" to="/" className="nav_logo">
              <img src={Logo} alt="Logo" />
            </NavLink>
          </h1>
          <NavLink activeClassName="active" to="/">
            Home
          </NavLink>
          <NavLink activeClassName="active" to="/shop">
            Shop
          </NavLink>
          <NavLink activeClassName="active" to="/about">
            About
          </NavLink>
          <NavLink activeClassName="active" to="/contact">
            Contact
          </NavLink>
        </div>

        <div className="right">
          <input
            onChange={handleSearchChange}
            value={keyword}
            className="search_input"
            type="text"
            placeholder="Search products and brands..."
            autoCorrect="false"
            autoComplete="false"
          />
          <Link to={`/shop?${query.toString()}`}>
            <IoIosSearch size={30} className="search_button" />
          </Link>
          {!isAuth ? (
            <Button variant="outlined" color="secondary" onClick={handleLogin}>
              Login
            </Button>
          ) : (
            <div style={{display: "flex", gap: "1rem"}}>            
              <Link to="/profile">
                <IoPersonOutline size={30} />
              </Link>
              <Notifications/>
            </div>
          )}
          <Link to="/cart">
            <IoCartOutline size={30} />
          </Link>
        </div>
      </nav>
    </header>
  );
}

NavBar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {})(NavBar);
