import { React } from "react";
import "./checkbox.scss";

export default function Input({
  type,
  className,
  id,
  name,
  isCompleted = false,
  handleChange = null,
  isDisabled = false,
  inputRef = null,
  ...props
}) {
  return (
    <input
      type={type}
      className={className}
      id={id}
      defaultChecked={isCompleted}
      name={name}
      ref={inputRef}
      onChange={handleChange}
      disabled={isDisabled}
      {...props}
    />
  );
}
