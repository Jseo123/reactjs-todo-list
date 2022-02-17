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
      editModeHandler(task.id, true);
    }
    editModeHandler(task.id);
  };

  const checkTaskMode = () => {
    // edit mode
    if (task.isEditing && !task.done) {
      return (
        <Input
          text-indent="15"
          type="text"
          name="task"
          onKeyPress={handleEdit}
          data-testid="todo-item"
          defaultValue={task.text}
        />
      );
    }
    // task completed mode
    if (task.done && !task.isEditing) {
      return (
        <label htmlFor="inputCheck" data-content={task.text}>
          {task.text}
        </label>
      );
    }
    // task added
    return (
      <button type="button" onClick={handleEdit} className="editBtn">
        {task.text}
      </button>
    );
  };
  return (
    <li>
      <fieldset className="taskFieldset">
        <Input
          onChange={checkboxAction}
          type="checkbox"
          name="checkTask"
          id="inputCheck"
          className="inputCheck"
          isDisabled={task.isEditing}
        />
        {checkTaskMode()}
        <button onClick={deleteItem} type="button" className="deleteBtn">
          <img src={deleteIcon} alt="icon delete" />
        </button>
      </fieldset>
    </li>
  );
}
