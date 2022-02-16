import { useState, React } from "react";
import { v4 as uuid } from "uuid";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./app.scss";

function App() {
  const [todoList, setTodoList] = useState({
    tasks: [],
    tasksCompleted: [],
  });

  function addTask(e) {
    if (e.key !== "Enter") return;
    if (e.target.value === "") return; // error msg
    const newTask = {
      id: uuid(),
      text: e.target.value,
      done: false,
      isEditing: false,
    };
    setTodoList({
      tasks: [...todoList.tasks, newTask],
    });
  }
  console.log(todoList.tasks);
  return (
    <>
      <header />
      <main>
        <h1 className="title">TODO</h1>
        <article>
          <TaskInput handleSubmit={addTask} />
        </article>
        <article>
          <TaskList />
        </article>
      </main>
    </>
  );
}

export default App;
