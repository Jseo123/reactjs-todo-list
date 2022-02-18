import React from "react";
import Task from "../Task";
import "./tasklist.scss";
import emptyTasklistImg from "../../assets/img/emptyTasklist.svg";

export default function TaskList({
  taskElements,
  completeHandler,
  deleteHandler,
  editModeHandler,
  filterSearch = false,
  emptyFilterMsg = "",
}) {
  if (taskElements.length === 0) {
    return (
      <fieldset className="taskFieldset emptyListFieldset">
        <h5 className="emptyListTitle">
          {filterSearch ? emptyFilterMsg : "You don't have tasks!"}
        </h5>
        <img
          className="svgIcon"
          src={emptyTasklistImg}
          alt="svg icon empty task"
        />
      </fieldset>
    );
  }
  return (
    <ul className="todosList" data-testid="todos-list">
      {taskElements.map((element) => (
        <Task
          editModeHandler={editModeHandler}
          checkboxHandler={completeHandler}
          deleteHandler={deleteHandler}
          key={element.id}
          task={element}
        />
      ))}
    </ul>
  );
}
