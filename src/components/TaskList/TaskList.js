import React from "react";
import Task from "../Task";

export default function TaskList({ taskElements }) {
  return (
    <ul className="todosList" data-testid="todos-list">
      {taskElements.map((element) => (
        <Task key={element.id} task={element.text} />
      ))}
    </ul>
  );
}
