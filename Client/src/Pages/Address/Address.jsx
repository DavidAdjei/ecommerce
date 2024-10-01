import React from "react";
import "./Address.css";

const Address = () => {
  return (
    <div className="address-page">
      <h1>Edit Address</h1>
      <div className="address-container">
        <div className="name">
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
        </div>

        <div className="phone">
          <input type="tel" placeholder="Phone Number" required />
          <input type="tel" placeholder="Additional Phone Number" required />
        </div>

        <div className="address-information">
          <input type="text" placeholder="Address" required />
          <input type="text" placeholder="Additional Information" required />
        </div>

        <div className="city">
          <input type="text" placeholder="Region" required />
          <input type="text" placeholder="City" required />
        </div>
        <button type="submit" className="save-btn">
          Save
        </button>
      </div>
    </div>
  );
};

export default Address;
