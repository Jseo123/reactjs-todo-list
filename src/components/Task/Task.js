import { React } from "react";

export default function Task({ task }) {
  return (
    <li>
      <fieldset className="taskFieldset">
        <input
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
