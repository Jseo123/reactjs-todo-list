import { React } from "react";

export default function TaskInput({ handleSubmit }) {
  function handleKeyPress(e) {
    if (e.key === "Enter") handleSubmit(e);
  }
  return (
    <fieldset>
      <input
        type="checkbox"
        disabled="disabled"
        name="check"
        className="inputCheck"
      />
      <input
        onKeyPress={handleKeyPress}
        type="text"
        name="taskInput"
        data-testid="create-todo-input"
        placeholder="Introduce the task here!"
      />
    </fieldset>
  );
}
