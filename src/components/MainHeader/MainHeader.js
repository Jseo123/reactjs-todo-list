import { React } from "react";

export default function MainHeader({ handleToogle }) {
  return (
    <div className="mainHeader">
      <h1 className="title">TODO</h1>
      <button
        id="toogle"
        type="button"
        data-testid="toggle-theme"
        onClick={handleToogle}
      >
        <span>&#9789;</span>
      </button>
    </div>
  );
}

// &#9789;
