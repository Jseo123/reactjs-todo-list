import React from "react";
import "./checkbox.scss";

export default function Input({
  type,
  className,
  id,
  name,
  handleChange = null,
  isDisabled = false,
  ...props
}) {
  return (
    <input
      type={type}
      className={className}
      id={id}
      name={name}
      onChange={handleChange}
      disabled={isDisabled}
      {...props}
    />
  );
}
