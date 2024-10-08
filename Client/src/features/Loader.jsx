import React from "react";
import { Atom } from "react-loading-indicators";
import "./features.css";

const Loader = () => {
  return (
    <div className="loader_container">
      <Atom color="#f5a022" size={50} text="Please Wait" textColor="#f5a022" />
    </div>
  );
};

export default Loader;
