import { useState, useEffect, React } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Active from "./pages/Active/Active";
import Done from "./pages/Done";
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
  useEffect(() => {
    // guardar datos en localStorage
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

  const deleteTask = (id) => {
    const { tasks } = todoList;
    const taskSelected = tasks.find((task) => task.id === id);
    const indexTaskSelected = tasks.indexOf(taskSelected);
    tasks.splice(indexTaskSelected, 1);
    setTodoList({
      tasks: [...tasks],
    });
  };
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

  // stops view from being edited.

  // check items left
  const checkState = () => {
    const { tasks } = todoList;

    const filteredItems = tasks.filter(
      (filteredElement) => filteredElement.done === false,
    );

    return filteredItems.length;
  };

  return (
    <>
      <Router>
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
              taskElements={todoList.tasks}
            />
            <Footer taskNumber={checkState()} />
          </article>
        </main>
        <Switch>
          <Route path="/Active">
            {/* deleteHandler, completeHandler, editModeHandler */}
            <Active taskElements={todoList.tasks} />
          </Route>
          <Route path="/Done">
            <Done taskElements={todoList.tasks} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
