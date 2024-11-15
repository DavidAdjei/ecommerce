import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import "./component.css";
import Logo from "../assets/images/Logo.jpeg";
import { IoPersonOutline } from "react-icons/io5";
import { IoCartOutline, IoChatbubblesOutline } from "react-icons/io5";
import { IoIosSearch, IoMdMenu, IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
import Notifications from "./Notifications";
import { useMediaQuery } from "@mui/material";
import './navbar.css';

function NavBar() {
  const { isAuth, user } = useSelector((state) => state.auth);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState(new URLSearchParams());
  const location = useLocation();
  const navigate = useNavigate();
  const [searching, setSearching] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSearchChange = (e) => {
    const searchKeyword = e.target.value;
    setKeyword(searchKeyword);
    setQuery(new URLSearchParams({ searchKeyword }));
  };

  const onSearchClick = () => setSearching(!searching);

  const handleLogin = () => {
    const query = new URLSearchParams({ page: location.pathname });
    navigate(`/login?${query.toString()}`);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <nav className="nav">
        <div className="left">
          <h1 className="nav_welcome">
            <NavLink to="/" className="nav_logo">
              <img src={Logo} alt="Logo" />
            </NavLink>
          </h1>

          {(!isMobile && user.role === 'buyer') || (!isMobile && !isAuth) ? (
            <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/shop">Shop</NavLink>
              <NavLink to="/about">About</NavLink>
            </>
          ): (
            !isMobile && user.role === 'seller' && (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/products">My Products</NavLink>
              </>
            )
          )}
        </div>

        <div className="right">
          {isMobile ? (
            <>
              {
                !isAuth && (
                  <>
                    <Link onClick={onSearchClick}><IoIosSearch size={24} /></Link>
                    <Button variant="outlined" color="secondary" onClick={handleLogin}>Login</Button>
                    <Link to="/cart"><IoCartOutline size={24} /></Link>
                  </>
                )
              }
              {
                isAuth && user.role === "buyer" && (
                  <>
                    <Link onClick={onSearchClick}><IoIosSearch size={24} /></Link>
                    <Link to="/profile"><IoPersonOutline size={24} /></Link>
                    <Link><Notifications /></Link>
                    <Link to="/chat"><IoChatbubblesOutline size={24} /></Link>
                    <Link to="/cart"><IoCartOutline size={24} /></Link>
                  </>
                )
              }
              {
                isAuth && user.role === "seller" && (
                  <>
                    <Link><Notifications /></Link>
                    <Link to="/chat"><IoChatbubblesOutline size={24} /></Link>
                  </>
                )
              }
              <Link onClick={toggleMenu}>
                {menuOpen ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
              </Link>
            </>
          ) : (
            <>
              {!isAuth ? (
                <>
                  <Link onClick={onSearchClick}><IoIosSearch size={30} /></Link>
                  <Button variant="outlined" color="secondary" onClick={handleLogin}>Login</Button>
                  <Link to="/cart"><IoCartOutline size={30} /></Link>
                </>
              ) : (
                <div style={{ display: "flex", gap: "1rem" }}>
                  {user.role === "buyer" && (
                    <>
                      <Link onClick={onSearchClick}><IoIosSearch size={30} /></Link>
                      <Link to="/profile"><IoPersonOutline size={30} /></Link>
                      <Notifications />
                      <Link to="/cart"><IoCartOutline size={30} /></Link>
                      <Link to="/chat"><IoChatbubblesOutline size={30} /></Link>
                    </>
                  )}
                  {user.role === "seller" && (
                    <>
                      <Notifications />
                      <Link to="/chat"><IoChatbubblesOutline size={30} /></Link>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </nav>

      {isMobile && menuOpen && (
        <div className="mobile-menu">
          {
            (!isAuth || user.role === "buyer") && (
              <>
                <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
                <NavLink to="/shop" onClick={toggleMenu}>Shop</NavLink>
                <NavLink to="/about" onClick={toggleMenu}>About</NavLink>
              </>
            )
          }
          {
            isAuth && user.role === "seller" && (
              <>
                <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
                <NavLink to="/about" onClick={toggleMenu}>About</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/products">My Products</NavLink>
              </>
            )
          }
          {!isAuth && (
            <Button variant="outlined" color="secondary" onClick={handleLogin}>Login</Button>
          )}
        </div>
      )}

      {/* Search Bar Displayed Below Navbar */}
      {searching && (
        <div className="search-bar-container">
          <input
            onChange={handleSearchChange}
            value={keyword}
            className="search_input"
            type="text"
            placeholder="Search products and brands..."
          />
          <Link to={`/shop?${query.toString()}`}>
            <IoIosSearch size={30} />
          </Link>
        </div>
      )}
    </header>
  );
}

export default NavBar;
