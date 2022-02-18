import React from "react";
import { Link } from "react-router-dom";

export default function Pagination() {
  return (
    <>
      <Link to="/">All</Link>
      <Link to="/Active">Active</Link>
      <Link to="/Done">Completed</Link>
    </>
  );
}
