import { React } from "react";
import "./Clear.scss";

export default function Clear({ handleClear }) {
  // condition if some items are completed, mark CLEAR COMPLETED
  return (
    <button className="clearBtn" type="button" onClick={handleClear}>
      Clear completed
    </button>
  );
}
