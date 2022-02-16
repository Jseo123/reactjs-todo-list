import { React } from "react";
import "./checkbox.scss";
import deleteIcon from "../../assets/img/deleteIcon.png";
/*
<input
          text-indent="15"
          type="text"
          name="task"
          data-testid="todo-item"
          defaultValue={task.text}
        /> */
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
        <input
          onChange={checkboxAction}
          type="checkbox"
          name="checkTask"
          id="inputCheck"
          className="inputCheck"
        />
        <label htmlFor="inputCheck" data-content={task.text}>
          {task.text}
        </label>
        <button onClick={deleteItem} type="button" className="deleteBtn">
          <img src={deleteIcon} alt="icon delete" />
        </button>
      </fieldset>
    </li>
  );
}
