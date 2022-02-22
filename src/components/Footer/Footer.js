import { React } from "react";
import Counter from "../Counter";
import Pagination from "../Pagination";
import Clear from "../Clear";
import "./footer.scss";

export default function Footer({ taskNumber, handleClear, highlightClear }) {
  return (
    <footer data-testid="app-footer">
      <div className="counter">
        <Counter taskNumber={taskNumber} />
      </div>
      <div className="footerCenter">
        <Pagination />
      </div>
      <div className="Clear">
        <Clear handleClear={handleClear} highlightClear={highlightClear} />
      </div>
    </footer>
  );
}
