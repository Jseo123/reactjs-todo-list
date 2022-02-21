import { React } from "react";

export default function MainHeader({ handleToogle }) {
  function ModeSwitch() {
    let span = "";
    const mode = handleToogle();
    console.log(mode);
    if (mode !== "dark") {
      span = <span>&#9789;</span>;
    } else {
      span = "☀";
    }

    return span;
  }

  return (
    <div className="mainHeader">
      <h1 className="title">TODO</h1>
      <button type="button" data-testid="toggle-theme" onClick={handleToogle}>
        <ModeSwitch />
      </button>
    </div>
  );
}

// &#9789;
