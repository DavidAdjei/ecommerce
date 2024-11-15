import React from 'react';
import { BsShieldLock } from "react-icons/bs";
import { BsTruck } from "react-icons/bs";
import { GrRotateLeft } from "react-icons/gr";
import { TfiHeadphoneAlt } from "react-icons/tfi";

export default function Support() {
  return (
    <div className="support">
        <div className="support-card">
          <BsTruck size={30} style={{ marginBottom: "10" }} />
          <h4>Nationwide Delivery</h4>
          <p>Delivery done across the whole nation</p>
        </div>
        <div className="support-card">
          <BsShieldLock size={30} style={{ marginBottom: "10" }} />
          <h4>Secure Payment</h4>
          <p>Payments are secured</p>
        </div>
        <div className="support-card">
          <TfiHeadphoneAlt size={30} style={{ marginBottom: "10" }} />
          <h4>24/7 Customer Support</h4>
          <p>Payments are secured</p>
        </div>
        <div className="support-card">
          <GrRotateLeft size={30} style={{ marginBottom: "10" }} />
          <h4>Free Returns</h4>
          <p>Free returns within specified period</p>
        </div>
      </div>
  )
}
