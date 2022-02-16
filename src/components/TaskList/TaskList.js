import React from "react";

export default function TaskList({ children }) {
  return (
    <ul className="todosList" data-testid="todos-list">
      {children}
    </ul>
  );
}
