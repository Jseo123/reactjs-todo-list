import { useState, useEffect, React } from "react";
import { Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./index.scss";
import Help from "./components/Help";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import MainHeader from "./components/MainHeader";
import "./app.scss";

let toogled = false;

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
    if (e.target.value === "") {
      return;
    }
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
    if (
      document
        .getElementsByClassName("createTaskInput")[0]
        .getAttribute("placeholder") === "Please enter at least one character"
    ) {
      document
        .getElementsByClassName("createTaskInput")[0]
        .setAttribute("placeholder", "Introduce the task here!");
    } // Changes placeholder back to normal in case an empty empty value was added.

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

  // check items left
  const checkState = () => {
    const { tasks } = todoList;

    const filteredItems = tasks.filter(
      (filteredElement) => filteredElement.done === false,
    );

    return filteredItems.length;
  };
  // filter array of task to done
  const filterTasksDone = () => {
    return todoList.tasks.filter(
      (filteredElement) => filteredElement.done === true,
    );
  };
  // filter array of task to active
  const filterTasksActive = () => {
    return todoList.tasks.filter(
      (filteredElement) => filteredElement.done !== true,
    );
  };

  const handleToogle = () => {
    const body = document.body;
    if (!toogled) {
      toogled = true;
      body.classList.remove("body-white");
      body.classList.add("dark");
      document.getElementById("toogle").innerText = "☀";
    } else {
      toogled = false;
      body.classList.remove("dark");
      body.classList.add("body-white");
      document.getElementById("toogle").innerText = "☽";
    }
    return body.getAttribute("class");
  };
  return (
    <>
      <header />
      <main>
        <Help />
        <MainHeader handleToogle={handleToogle} />
        <article className="createTaskContainer">
          <TaskInput handleSubmit={addTask} />
        </article>
        <article className="todoListContainer">
          <Route path="/Active">
            <TaskList
              editModeHandler={taskEditMode}
              deleteHandler={deleteTask}
              completeHandler={taskCompleted}
              taskElements={filterTasksActive()}
              isFiltering
              emptyFilterMsg={"There's no active tasks"}
            />
          </Route>
          <Route path="/Done">
            <TaskList
              editModeHandler={taskEditMode}
              deleteHandler={deleteTask}
              completeHandler={taskCompleted}
              taskElements={filterTasksDone()}
              isFiltering
              emptyFilterMsg={"Ups, there's no completed tasks"}

            />
          </Route>
          <Route exact path="/">
            <TaskList
              editModeHandler={taskEditMode}
              deleteHandler={deleteTask}
              completeHandler={taskCompleted}
              taskElements={todoList.tasks}
            />
          </Route>
          <Footer taskNumber={checkState()} handleClear={clearCompletedTasks} />
        </article>
      </main>
    </>
  );
}
