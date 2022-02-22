import React from "react";
import "./button.scss";

export default function Button({
  type = false,
  isDisabled = false,
  className,
  handleClick,
  children,
  ...props
}) {
  return (
    <button
      type={!type ? "button" : "submit"}
      disabled={isDisabled}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
