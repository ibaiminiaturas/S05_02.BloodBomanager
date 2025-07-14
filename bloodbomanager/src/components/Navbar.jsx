import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ marginBottom: "20px" }}>
      <NavLink to="/" style={{ marginRight: "10px" }}>
        Inicio
      </NavLink>
      <NavLink to="/status">Status API</NavLink>
    </nav>
  );
}