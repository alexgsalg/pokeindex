import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import PokeIndex from "../../assets/imgs/Pokeindex-logo.png";

function Navbar() {
  return (
    <header>
      <img src={PokeIndex} alt="PokeIndex" className="logo" />
      <nav className="navbar">
        <NavLink to="/">Pokedex</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
