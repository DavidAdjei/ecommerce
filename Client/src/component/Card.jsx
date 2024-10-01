import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

import { IoPersonOutline } from "react-icons/io5";
import { FaBoxOpen } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

const Card = ({ children }) => {
  return (
    <>
      <div className="card">
        {children}

        <div className="card-items">
          <Link to="/profile">
            <IoPersonOutline size={20} />
            <p>My Account</p>
          </Link>
          <Link to="/orders">
            <FaBoxOpen size={20} />
            <p>Orders</p>
          </Link>
          <Link to="/favourites">
            <CiHeart size={20} />
            <p>Saved Items</p>
          </Link>
          <button>
            <IoIosLogOut size={20} />
            <p>LOGOUT</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
