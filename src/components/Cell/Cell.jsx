import React from "react";
import Lottie from "lottie-react";
import './Cell.css'
import crossAnimation from "../../assets/cross.json";
import ovalAnimation from "../../assets/oval.json";

const Cell = ({ value, onClick }) => {
  return (
    <div className="cell" onClick={onClick}>
      {value === "X" && (
        <Lottie animationData={crossAnimation} autoplay loop={false} className="cellAnimation"/> //style={{ width: "80", height: "80%" }} 
      )}
      {value === "O" && (
        <Lottie animationData={ovalAnimation} autoplay loop={false} className="cellAnimation"/>
      )}
    </div>
  );
};

export default Cell;
