import { useState, React } from "react";
import { Switch, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import Active from "./pages/Active/Active";
import Done from "./pages/Done";
import "./app.scss";

export default function App() {
  const [todoList, setTodoList] = useState({
    tasks: [],
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
  const taskStatus = (id) => {
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

  function checkState() {
    const { tasks } = todoList;

    const filteredItems = tasks.filter(
      (filteredElement) => filteredElement.done === false,
    );

    return filteredItems.length;
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
            /* deleteHandler={deleteTask} */
            completeHandler={taskStatus}
            taskElements={todoList.tasks}
          />
          <Footer taskNumber={checkState()} />
        </article>
      </main>
      <Switch>
        <Route path="/Active">
          <Active />
        </Route>
        <Route path="/Done">
          <Done />
        </Route>
      </Switch>
    </>
  );
}
