import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./component.css";
import Logo from "../assets/images/Logo.jpeg";
import { IoPersonOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import Card from "./Card";
import Button from "@mui/material/Button";

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

  const [showCard, setShowCard] = useState(false);

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
            <Link to="/" className="nav_logo">
              <img src={Logo} alt="Logo" />
            </Link>
          </h1>
          <Link to="/" activeClassName="active">
            Home
          </Link>
          <Link to="/shop" activeClassName="active">
            Shop
          </Link>
          <Link to="/about" activeClassName="active">
            About
          </Link>
          <Link to="/contact" activeClassName="active">
            Contact
          </Link>
        </div>

        <div className="right">
          <input
            onChange={handleSearchChange}
            value={keyword}
            className="search_input"
            type="text"
            placeholder="Search with name"
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
          ) : null}

          {isAuth && showCard && <Card />}
          <Link to="/profile">
            <IoPersonOutline size={30} onClick={() => setShowCard(!showCard)} />
          </Link>

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
