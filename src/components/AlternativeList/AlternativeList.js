import React from "react";
import AlternativeTask from "../AlternativeTask";
import "../TaskList/tasklist.scss";

export default function AlternativeList({ taskElements }) {
  if (taskElements.length === 0) {
    return (
      <fieldset className="taskFieldset">
        <ul className="todosList" data-testid="todos-list">
          <h5 className="emptyListTitle">Add some task to start!</h5>
        </ul>
      </fieldset>
    );
  }
  return (
    <ul className="todosList" data-testid="todos-list">
      {taskElements.map((element) => (
        <AlternativeTask key={element.id} task={element} />
      ))}
    </ul>
  );
}
