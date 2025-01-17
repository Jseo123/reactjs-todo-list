import { React } from "react";
import Input from "../Input";

export default function TaskInput({ handleSubmit }) {
  function handleKeyPress(e) {
    if (e.key === "Enter" && e.target.value !== "") {
      handleSubmit(e);
    } else {
      const inputTask = document.getElementsByClassName("createTaskInput")[0];
      inputTask.setAttribute(
        "placeholder",
        "Please enter at least one character",
      );
    }
    return true;
  }

  return (
    <fieldset>
      <div className="formInputs">
        <Input
          type="checkbox"
          disabled="disabled"
          name="check"
          className="inputCheck"
          data-testid="todo-item-checkbox"
        />
        <Input
          // eslint-disable-next-line react/jsx-no-bind
          onKeyPress={handleKeyPress}
          type="text"
          name="taskInput"
          className="createTaskInput"
          data-testid="create-todo-input"
          placeholder="Introduce the task here!"
        />
      </div>
    </fieldset>
  );
}
