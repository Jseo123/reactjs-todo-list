import { React } from "react";
import Counter from "../Counter";
import Pagination from "../Pagination";
import Clear from "../Clear";
import "./footer.scss";

export default function Footer() {
  return (
    <footer>
      <div className="counter">
        <Counter />
      </div>
      <div className="footerCenter">
        <Pagination />
      </div>
      <div className="Clear">
        <Clear />
      </div>
    </footer>
  );
}
