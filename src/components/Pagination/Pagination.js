import React from "react";
import { NavLink } from "react-router-dom";

export default function Pagination() {
  return (
    <>
      <NavLink exact to="/" activeClassName="is-active">
        All
      </NavLink>
      <NavLink activeClassName="is-active" to="/Active">
        Active
      </NavLink>
      <NavLink activeClassName="is-active" to="/Done">
        Completed
      </NavLink>
    </>
  );
}
