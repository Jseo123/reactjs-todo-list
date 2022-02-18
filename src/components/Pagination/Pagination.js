import React from "react";
import { NavLink } from "react-router-dom";

export default function Pagination() {
  return (
    <>
      <NavLink className="link" exact to="/" activeClassName="is-active">
        All
      </NavLink>
      <NavLink className="link" activeClassName="is-active" to="/Active">
        Active
      </NavLink>
      <NavLink className="link" activeClassName="is-active" to="/Done">
        Completed
      </NavLink>
    </>
  );
}
