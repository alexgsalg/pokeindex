import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <h1>PokeIndex</h1>
      <nav className="navbar">
        <NavLink to="/">Pokedex</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
