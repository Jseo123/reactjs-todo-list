import React from "react";
import { Link } from "react-router-dom";

export default function Pagination() {
  return (
    <>
      <div>
        <Link to="/">All</Link>
      </div>
      <div>
        <Link to="/Active">Active</Link>
      </div>
      <div>
        <Link to="/Done">Completed</Link>
      </div>
    </>
  );
}
