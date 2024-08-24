import { useState, useEffect } from "react";
import List from "@mui/material/List";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { Typography } from "@mui/material";

// const initialTodos = [
//   { id: 1, text: "Solve streak ques on Leetcode", completed: false },
//   { id: 2, text: "Practice react", completed: false },
//   { id: 3, text: "Drink 3-4 lts of Water", completed: true },
//   { id: 4, text: "Evening Walk", completed: false },
// ];

const getInitialData = () => {
  const data = JSON.parse(localStorage.getItem("todos"))
  if(!data) return [];
  else return data;
};

const groupTodosByDate = (todos) => {
  return todos.reduce((groups, todo) => {
    const date = todo.createdAt.split(",")[0]; 
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(todo);
    return groups;
  }, {});<q></q>
};

export default function TodoList() {
  const [todos, setTodos] = useState(getInitialData);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const removeTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((t) => t.id !== id);
    });
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      });
    });
  };
  const addTodo = (text) => {
    setTodos((prevTodos) => {
      return [...prevTodos, { text: text, id: crypto.randomUUID(), completed: false, createdAt: new Date().toLocaleString() }];
    });
  };

  // const groupedTodos = useMemo(() => groupTodosByDate(todos), [todos]);

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {todos.map((todo) =>{
        return(
            <TodoItem
              todo={todo}
              key={todo.id}
              removeTodo={() => removeTodo(todo.id)}
              toggle={() => toggleTodo(todo.id)}
            />
        );
      })}
      <TodoForm addTodo={addTodo} />
    </List>
  );
}
