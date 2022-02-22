import React from "react";
import "./button.scss";

export default function Button({
  type = false,
  isDisabled = false,
  className,
  handleClick,
  handleDoubleClick = null,
  children,
  ...props
}) {
  return (
    <button
      type={!type ? "button" : "submit"}
      disabled={isDisabled}
      className={className}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      {...props}
    >
      {children}
    </button>
  );
}
