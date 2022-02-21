import React from "react";
import { motion } from 'framer-motion/dist/framer-motion'
import Task from "../Task";
import "./tasklist.scss";
import emptyTasklistImg from "../../assets/img/emptyTasklist.svg";

export default function TaskList({
  taskElements,
  completeHandler,
  deleteHandler,
  editModeHandler,
  isFiltering = false,
  emptyFilterMsg = "",
}) {
  // if array is empty
  if (taskElements.length === 0) {
    return (
      <fieldset className="taskFieldset emptyListFieldset">
        <h5 className="emptyListTitle">
          {isFiltering ? emptyFilterMsg : "You don't have tasks!"}
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
    <ul className="todosListUl" data-testid="todos-list">
      {taskElements.map((element, index) => (
        <motion.div key={element.id}
          initial={{ y: -10 + index, opacity: 0 }}
          animate={{ y: 0, opacity: 1, }}
          transition={{ delay: 0 + (index / 10) }}>
          <Task
            editModeHandler={editModeHandler}
            checkboxHandler={completeHandler}
            deleteHandler={deleteHandler}
            key={element.id}
            task={element}
          />
        </motion.div>
      ))}
    </ul>
  );
}
