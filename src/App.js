import { useState, useEffect, React } from "react";
import { Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./index.scss";
import "./app.scss";
import Help from "./components/Help";
import TaskInput from "./components/TaskInput";
import TaskList,{filterItemsCompleted} from "./components/TaskList";
import Footer from "./components/Footer";
import MainHeader from "./components/MainHeader";
import { TaskContext, TaskListContext } from "./context/TaskContext";

// task context

function loadHelpLocalStorage() {
  if (!localStorage.getItem("helped")) {
    return false;
  }
  return JSON.parse(localStorage.getItem("helped"));
}
function loadTaskLocalStorage() {
  if (!localStorage.getItem("reactjs-todo-list")) {
    return [];
  }
  return JSON.parse(localStorage.getItem("reactjs-todo-list"));
}

export default function App() {
  const [editingAnyItem, setEditingAnyItem] = useState(false);
  const [tasks, setTodoList] = useState(loadTaskLocalStorage());

  // update localStorage
  useEffect(() => {
    localStorage.setItem("reactjs-todo-list", JSON.stringify(tasks));
  }, [tasks]);

  // add task
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
    setTodoList([newTask, ...tasks]);


    e.target.value = ""; // reset input
  };

  // task completed checked / unchecked
  const taskCompleted = (id) => {
    const taskSelected = tasks.find((task) => task.id === id);
    if (!taskSelected.done) {
      const taskComplete = { ...taskSelected, done: true };
      const tasksFiltered = tasks.filter(
        (element) => element.id !== taskSelected.id,
      );

      setTodoList([...tasksFiltered, taskComplete]);
    } else {
      const taskComplete = { ...taskSelected, done: false };
      const indexTaskSelected = tasks.indexOf(taskSelected);
      tasks[indexTaskSelected] = taskComplete;

      setTodoList([...tasks]);
    }
  };
  // delete task
  const deleteTask = (id) => {
    const taskSelected = tasks.find((task) => task.id === id);
    if (taskSelected.isEditing) {
      setEditingAnyItem(false);
    }
    const indexTaskSelected = tasks.indexOf(taskSelected);
    tasks.splice(indexTaskSelected, 1);
    setTodoList([...tasks]);
  };
  // edit task and enter edited
  const taskEditMode = (id, edited = false, inputValue = undefined) => {
    const taskSelected = tasks.find((task) => task.id === id);
    const indexTaskSelected = tasks.indexOf(taskSelected);
    if (edited) {
      // change editing boolean to false, change text for new inputted text
      tasks[indexTaskSelected] = {
        ...taskSelected,
        isEditing: false,
        text: inputValue,
      };
      setEditingAnyItem(false);
      // set input to edit
    } else if (!editingAnyItem) {
      tasks[indexTaskSelected] = { ...taskSelected, isEditing: true };
      setEditingAnyItem(true);
    }
    setTodoList([...tasks]);
  };
  // clear completed tasks
  const clearCompletedTasks = () => {
    const itemsActive = tasks.filter(
      (filteredElement) => filteredElement.done !== true,
    );
    setTodoList([...itemsActive]);
  };

  // check items left
  const checkState = () => {
    const filteredItems = tasks.filter(
      (filteredElement) => filteredElement.done === false,
    );

    return filteredItems.length;
  };
  // night mode, light mode

  const handleToogle = () => {
    const body = document.body;
    let toogled = JSON.parse(localStorage.getItem("mode"));

    if (toogled === false) {
      toogled = true;
      localStorage.setItem("mode", "true");
      body.classList.remove("body-white");
      body.classList.add("dark");
      document.getElementById("toogle").innerText = "☀";
    } else {
      toogled = false;
      localStorage.setItem("mode", "false");
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
        <Help handleLocalStorage={loadHelpLocalStorage} />
        <MainHeader handleToogle={handleToogle} />
        <article className="createTaskContainer">
          <TaskInput handleSubmit={addTask} />
        </article>

        <article className="todoListContainer">
          <TaskListContext.Provider value={{
            reOrderList: setTodoList,
            tasks:tasks
          }}>
            <TaskContext.Provider value={{
              editModeHandler: taskEditMode,
              deleteHandler: deleteTask,
              completeHandler: taskCompleted,
              

            }}>
              <Route path="/Active">
                <TaskList
                  isFilteringActiveTasks
                  emptyFilterMsg={"There's no active tasks"}
                />
              </Route>
              <Route path="/Done">
                <TaskList
                  isFilteringCompletedTasks
                  emptyFilterMsg={"Ups, there's no completed tasks"}
                />
              </Route>
              <Route exact path="/">
                <TaskList/>
              </Route>
            </TaskContext.Provider>
          </TaskListContext.Provider>
          <Footer taskNumber={checkState()} handleClear={clearCompletedTasks} highlightClear={()=> filterItemsCompleted(tasks)} />
        </article>

      </main>
    </>
  );
}
