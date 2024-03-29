import React, { useState } from "react";
import { navigate } from "@reach/router";
import enter from "../../assets/enter.png"
 import "./Enter.scss"

export default function Enter({ seasons }) {

const [isEntered, animate] = useState(false);
  const enterAnimation = () => {
    animate(true)
    navigate(`/`);
    sessionStorage.setItem("entered", true);
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${enter})` }}
        className={`image left ${isEntered ? "slide-off-left" : ""}`}
        onClick={enterAnimation}
      />
      <div
        onClick={enterAnimation}
        style={{ backgroundImage: `url(${enter})` }}
        className={`image right ${isEntered ? "slide-off-right" : ""}`}
      />
    </>
  );
}
