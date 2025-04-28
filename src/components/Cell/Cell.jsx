import React from "react";
import Lottie from "lottie-react";
import './Cell.css'
import crossAnimation from "../../assets/cross.json";
import ovalAnimation from "../../assets/oval.json";
import { CROSS } from "../../utils/gameConst";

const Cell = ({ value, onClick }) => {
  return (
    <div className="cell" onClick={onClick}>
      {value && (
        <Lottie
          animationData={value === CROSS ? crossAnimation : ovalAnimation}
          autoplay
          loop={false}
        />
      )}
    </div>
  );
};

export default Cell;
