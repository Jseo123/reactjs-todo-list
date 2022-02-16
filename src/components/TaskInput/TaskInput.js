import { React } from "react";

export default function TaskInput({ handleSubmit }) {
  function test(e) {
    handleSubmit(e);
  }
  return (
    <fieldset>
      <input
        onKeyPress={test}
        type="text"
        name="taskInput"
        data-testid="create-todo-input"
        placeholder="Introduce the task here!"
      />
      <input
        type="checkbox"
        disabled="disabled"
        name="check"
        className="inputCheck"
      />
    </fieldset>
  );
}
