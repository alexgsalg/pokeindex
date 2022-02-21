import React from "react";
// eslint-disable-next-line
// import { NavLink } from "react-router-dom";
import "./style.scss";
import PokeIndex from "../../assets/imgs/Pokeindex-logo.png";

function Navbar() {
  return (
    <header>
      <img src={PokeIndex} alt="PokeIndex" className="logo" />
    </header>
  );
}

export default Navbar;
