import { React } from "react";
import Input from "../Input";

export default function TaskInput({ handleSubmit }) {
  function handleKeyPress(e) {
    if (e.key === "Enter") handleSubmit(e);
  }
  return (
    <fieldset>
      <Input
        type="checkbox"
        disabled="disabled"
        name="check"
        className="inputCheck"
      />
      <Input
        onKeyPress={handleKeyPress}
        type="text"
        name="taskInput"
        data-testid="create-todo-input"
        placeholder="Introduce the task here!"
      />
    </fieldset>
  );
}
