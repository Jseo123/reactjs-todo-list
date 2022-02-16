import React from "react";
import Task from "../Task";

export default function TaskList({ tasks }) {
  return (
    <ul className="todosList" data-testid="todos-list">
      {tasks.map((element) => (
        <Task key={element.id} task={element} />
      ))}
    </ul>
  );
}
