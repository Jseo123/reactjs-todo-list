import React from "react";
import Task from "../Task";
import "./tasklist.scss";

export default function TaskList({
  taskElements,
  completeHandler,
  deleteHandler,
}) {
  if (taskElements.length === 0) {
    return (
      <ul className="todosList" data-testid="todos-list">
        <h5 className="emptyListTitle">Add some task to start!</h5>
      </ul>
    );
  }
  return (
    <ul className="todosList" data-testid="todos-list">
      {taskElements.map((element) => (
        <Task
          checkboxHandler={completeHandler}
          deleteHandler={deleteHandler}
          key={element.id}
          task={element}
        />
      ))}
    </ul>
  );
}
