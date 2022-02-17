import { React } from "react";
import "./alternativeTask.scss";

export default function AlternativeTask({ task }) {
  return (
    <label
      className="checkboxLabel"
      htmlFor="inputCheck"
      data-content={task.text}
    >
      {task.text}
    </label>
  );
}
