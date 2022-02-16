import { React } from "react";
import "./checkbox.scss";
import deleteIcon from "../../assets/img/deleteIcon.png";

export default function Task({ task, checkboxHandler, deleteHandler }) {
  const checkboxAction = () => {
    checkboxHandler(task.id);
  };
  const deleteItem = () => {
    deleteHandler(task.id);
  };
  return (
    <li>
      <fieldset className="taskFieldset">
        <button onClick={deleteItem} type="button" className="deleteBtn">
          <img src={deleteIcon} alt="icon delete" />
        </button>
        <input
          text-indent="15"
          type="text"
          name="task"
          data-testid="todo-item"
          defaultValue={task.text}
        />
        <input
          onChange={checkboxAction}
          type="checkbox"
          name="checkTask"
          className="inputCheck"
        />
      </fieldset>
    </li>
  );
}
