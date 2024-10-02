import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { IoCartOutline } from "react-icons/io5";

const Profile = () => {
  return (
    <div className="profilePage">
      <h1>Account Overview</h1>
      <div className="container">
        <div className="account-info">
          <p className="details-title">Account Details</p>

          <h4 className="details">Solomon Cudjoe</h4>
          <h4 className="details">solo@gmail.com</h4>
        </div>

        <div className="address">
          <div className="address-info">
            <div className="item">
              <p className="address-title">Address Book</p>
              <Link to="/edit-address">
                <IoCartOutline size={20} />
              </Link>
            </div>

            <span style={{ color: "black" }}>Your shipping address:</span>

            <h4 className="address-info">Solomon Cudjoe</h4>
            <h4 className="address-info">solo@gmail.com</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
