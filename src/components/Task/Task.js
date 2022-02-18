import { React } from "react";
import "./Task.scss";
import deleteIcon from "../../assets/img/deleteIcon.png";
import Input from "../Input";

export default function Task({
  editModeHandler,
  task,
  checkboxHandler,
  deleteHandler,
}) {
  const checkboxAction = () => {
    checkboxHandler(task.id);
  };
  const deleteItem = () => {
    deleteHandler(task.id);
  };
  const handleEdit = (e) => {
    if (e.key === "Enter") {
      editModeHandler(task.id, true, e.target.value);
    }
  };

  const checkTaskMode = () => {
    // edit mode
    if (task.isEditing && !task.done) {
      return (
        <Input
          type="text"
          name="task"
          id="taskEditing"
          onKeyPress={handleEdit}
          data-testid="todo-item-input"
          defaultValue={task.text}
        />
      );
    }
    // task completed mode
    if (task.done && !task.isEditing) {
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
    // task added
    return (
      <button
        type="button"
        onClick={() => editModeHandler(task.id)}
        className="editBtn"
      >
        {task.text}
      </button>
    );
  };
  return (
    <li data-testid="todo-item">
      <fieldset className="taskFieldset">
        <Input
          onChange={checkboxAction}
          type="checkbox"
          name="checkTask"
          id="inputCheck"
          isCompleted={task.done}
          className="inputCheck"
          isDisabled={task.isEditing}
          data-testid="todo-item-checkbox"
        />
        {checkTaskMode()}
        <button
          onClick={deleteItem}
          type="button"
          data-testid="todo-item-delete-button"
          className="deleteBtn"
        >
          <img src={deleteIcon} alt="icon delete" />
        </button>
      </fieldset>
    </li>
  );
}
