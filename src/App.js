import { useState, useEffect, React } from "react";
import { Route } from "react-router-dom";
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

  const arrayTasksDone = () => {
    return todoList.tasks.filter(
      (filteredElement) => filteredElement.done === true,
    );
  };

  const arrayTasksActive = () => {
    return todoList.tasks.filter(
      (filteredElement) => filteredElement.done !== true,
    );
  };

  return (
    <>
      <header />
      <main>
        <h1 className="title">TODO</h1>
        <article className="createTaskContainer">
          <TaskInput handleSubmit={addTask} />
        </article>
        <article className="todoListContainer">
          <Route path="/Active">
            <TaskList
              editModeHandler={taskEditMode}
              deleteHandler={deleteTask}
              completeHandler={taskCompleted}
              taskElements={arrayTasksActive()}
            />
          </Route>
          <Route path="/Done">
            <TaskList
              editModeHandler={taskEditMode}
              deleteHandler={deleteTask}
              completeHandler={taskCompleted}
              taskElements={arrayTasksDone()}
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
