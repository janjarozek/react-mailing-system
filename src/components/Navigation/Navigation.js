import React from "react";

import { Link } from "react-router-dom";

import "./Navigation.scss";

export default function Navigation({ menu }) {
  return (
    <nav className="navigation">
      <ul>
        {menu.map((elem) => (
          <li key={`link-${elem.label}`}>
            <Link to={elem.adress}>{elem.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
