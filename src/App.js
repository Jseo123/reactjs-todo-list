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
      taskSelected.done = true;
      setTodoList({
        ...todoList,
        tasksCompleted: [...todoList.tasksCompleted, taskSelected],
      });
    }
  };
  console.log(todoList.tasksCompleted);
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
            /* deleteHandler={deleteTask} */ completeHandler={taskStatus}
            taskElements={todoList.tasks}
          />
        </article>
      </main>
    </>
  );
}

export default App;
