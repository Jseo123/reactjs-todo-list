import React, { useContext } from "react";

import { Reorder, AnimatePresence } from "framer-motion/dist/framer-motion";

import { TaskListContext } from "../../context/TaskContext";
import Task from "../Task";
import "./tasklist.scss";
import emptyTasklistImg from "../../assets/img/emptyTasklist.svg";

const variants = {
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.05,
    },
  }),
  hidden: { opacity: 0 },
};

export const filterItemsCompleted = (items) => {
  return items.filter((filteredElement) => filteredElement.done === true);
};

const filterItemsActive = (items) => {
  return items.filter((filteredElement) => filteredElement.done !== true);
};

export default function TaskList({
  isFilteringCompletedTasks = false,
  isFilteringActiveTasks = false,
  emptyFilterMsg = "",
}) {
  const taskListContext = useContext(TaskListContext)
  const { tasks } = taskListContext

  // filter array of task to done
  
  // filter array of task to active
  

  const setFilters = () => {
    if (isFilteringActiveTasks) {
      const filteredTasks = filterItemsActive(tasks)
      return filteredTasks
    }
    if (isFilteringCompletedTasks) {
      const filteredTasks = filterItemsCompleted(tasks)
      return filteredTasks
    }
    return tasks
  }


  // if array is empty
  if (tasks.length === 0) {
    return (
      <fieldset className="taskFieldset emptyListFieldset">
        <h5 className="emptyListTitle">
          {isFilteringCompletedTasks || isFilteringActiveTasks ? emptyFilterMsg : "You don't have tasks!"}
        </h5>
        <img
          className="svgIcon"
          src={emptyTasklistImg}
          alt="svg icon empty task"
        />
      </fieldset>
    );
  }
  const taskElements = setFilters()
  return (
    <Reorder.Group
      data-testid="todos-list"
      className="todosListUl"
      axis="y"
      values={taskElements}
      onReorder={taskListContext.reOrderList}
    >
      <AnimatePresence>
        {taskElements.map((element, index) => (
          <Reorder.Item
            data-testid="todo-item"
            className="reorderItem"
            value={element}
            key={element.id}
            custom={index}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: "-100%" }}
            layoutId={element.id}
            variants={variants}
          >
            <Task
              key={element.id}
              task={element}
            />
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>

  );
}
