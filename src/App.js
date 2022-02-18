import { useState, useEffect, React } from "react";
import { v4 as uuid } from "uuid";
import "./index.scss";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import "./app.scss";

function loadLocalStorage() {
  if (!localStorage.getItem("reactjs-todo-list")) {
    return [];
  }
  return JSON.parse(localStorage.getItem("reactjs-todo-list"));
}
export default function App() {
  const [todoList, setTodoList] = useState({
    tasks: loadLocalStorage(),
  });

  // update localStorage
  useEffect(() => {
    localStorage.setItem("reactjs-todo-list", JSON.stringify(todoList.tasks));
  });

  const addTask = (e) => {
    if (e.target.value === "") return; // error msg
    const newTask = {
      id: uuid(),
      text: e.target.value,
      done: false,
      isEditing: false,
    };
    setTodoList({
      ...todoList,
      tasks: [...todoList.tasks, newTask],
    });
    e.target.value = ""; // reset input
  };
  // task completed checked / unchecked
  const taskCompleted = (id) => {
    const { tasks } = todoList;
    const taskSelected = tasks.find((task) => task.id === id);
    if (!taskSelected.done) {
      const taskEdited = { ...taskSelected, done: true };
      const indexTaskSelected = tasks.indexOf(taskSelected);
      tasks[indexTaskSelected] = taskEdited;

      setTodoList({
        ...todoList,
        tasks: [...tasks],
      });
    } else {
      const taskEdited = { ...taskSelected, done: false };
      const indexTaskSelected = tasks.indexOf(taskSelected);
      tasks[indexTaskSelected] = taskEdited;

      setTodoList({
        ...todoList,
        tasks: [...tasks],
      });
    }
  };
  // delete task
  const deleteTask = (id) => {
    const { tasks } = todoList;
    const taskSelected = tasks.find((task) => task.id === id);
    const indexTaskSelected = tasks.indexOf(taskSelected);
    tasks.splice(indexTaskSelected, 1);
    setTodoList({
      tasks: [...tasks],
    });
  };
  // edit task and enter edited
  const taskEditMode = (id, edited = false, inputValue = undefined) => {
    const { tasks } = todoList;
    const taskSelected = tasks.find((task) => task.id === id);
    const indexTaskSelected = tasks.indexOf(taskSelected);
    if (edited) {
      // change editing boolean to false, change text for new inputted text
      tasks[indexTaskSelected] = {
        ...taskSelected,
        isEditing: false,
        text: inputValue,
      };
    } else {
      tasks[indexTaskSelected] = { ...taskSelected, isEditing: true };
    }
    setTodoList({
      tasks: [...tasks],
    });
  };
  // clear completed tasks
  const clearCompletedTasks = () => {
    const itemsActive = todoList.tasks.filter(
      (filteredElement) => filteredElement.done !== true,
    );
    setTodoList({
      tasks: itemsActive,
    });
  };

  // todoList.task

  // check items left
  const checkState = () => {
    const { tasks } = todoList;

    const filteredItems = tasks.filter(
      (filteredElement) => filteredElement.done === false,
    );

    return filteredItems.length;
  };

  function checkRouting() {
    const path = window.location.pathname;
    let filteredItems = todoList.tasks;
    if (path === "/Active") {
      filteredItems = filteredItems.filter(
        (filteredElement) => filteredElement.done === false,
      );
    } else if (path === "/Done") {
      filteredItems = filteredItems.filter(
        (filteredElement) => filteredElement.done === true,
      );
    } else {
      filteredItems = todoList.tasks;
    }
    console.log(filteredItems);
    return filteredItems;
  }

  return (
    <>
      <header />
      <main>
        <h1 className="title">TODO</h1>
        <article className="createTaskContainer">
          <TaskInput handleSubmit={addTask} />
        </article>
        <article className="todoListContainer">
          <TaskList
            editModeHandler={taskEditMode}
            deleteHandler={deleteTask}
            completeHandler={taskCompleted}
            taskElements={checkRouting()}
          />
          <Footer
            taskNumber={checkState()}
            handleClear={clearCompletedTasks}
            handlePath={checkRouting}
          />
        </article>
      </main>
    </>
  );
}
