import React, { useReducer, useState } from "react";
import "./styles.css";

const initialState = [
  { id: 1, title: "Wash Dishes", completed: false },
  { id: 2, title: "Grocery Shopping", completed: false },
  { id: 3, title: "Water Plants", completed: false },
  { id: 4, title: "Wash Car", completed: true },
  {
    id: 5,
    title: "Empty Laundry",
    completed: false,
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        { id: Date.now(), title: action.payload, completed: false },
        ...state,
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "EDIT_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo
      );
    default:
      return state;
  }
};

const App = () => {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState({ id: null, title: "" });

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch({ type: "ADD_TODO", payload: newTodo });
      setNewTodo("");
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo({ id: todo.id, title: todo.title });
  };

  const handleSaveEdit = () => {
    if (editingTodo.title.trim()) {
      dispatch({ type: "EDIT_TODO", payload: editingTodo });
      setEditingTodo({ id: null, title: "" });
    }
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo..."
      />
      <button onClick={handleAddTodo}>Add</button>
      <div>
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                dispatch({ type: "TOGGLE_TODO", payload: todo.id })
              }
            />
            {editingTodo.id === todo.id ? (
              <input
                type="text"
                value={editingTodo.title}
                onChange={(e) =>
                  setEditingTodo({ ...editingTodo, title: e.target.value })
                }
                onBlur={handleSaveEdit}
              />
            ) : (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            )}
            <button onClick={() => handleEditTodo(todo)}>
              {editingTodo.id === todo.id ? "Save" : "Edit"}
            </button>
            <button
              onClick={() =>
                dispatch({ type: "DELETE_TODO", payload: todo.id })
              }
              disabled={!todo.completed}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
