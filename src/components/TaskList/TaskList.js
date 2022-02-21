import React from "react";
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion'
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
  const variants = {
    visible: i => ({
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
    hidden: { opacity: 0 },
  }
  return (
    <ul className="todosListUl" data-testid="todos-list">
      <AnimatePresence>
        {taskElements.map((element, index) => (
          <motion.div key={element.id}
            custom={index}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: "-100%" }}
            variants={variants}
          >

            <Task
              editModeHandler={editModeHandler}
              checkboxHandler={completeHandler}
              deleteHandler={deleteHandler}
              key={element.id}
              task={element}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </ul>
  );
}
