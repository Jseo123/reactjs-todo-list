import { React } from "react";
import "./checkbox.scss";
import deleteIcon from "../../assets/img/deleteIcon.png";

export default function Task({ task }) {
  return (
    <li>
      <fieldset className="taskFieldset">
        <button type="button" className="deleteBtn">
          <img src={deleteIcon} alt="icon delete" />
        </button>
        <input
          text-indent="15"
          type="text"
          name="task"
          data-testid="todo-item"
          value={task.text}
        />
        <input type="checkbox" name="checkTask" className="inputCheck" />
      </fieldset>
    </li>
  );
}
