import { useQueryTodos } from "@/hooks/useQueryTodos";
import React from "react";

const Todo = () => {
  const { data: todos, status } = useQueryTodos();
  if (status == "loading") return <a>Loading...</a>;
  return (
    <ul>
      {todos?.map((todo) => {
        return (
          <li key={todo.id}>
            <p>{todo.title}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Todo;
