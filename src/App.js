import React, { useState, useEffect} from "react";
import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  //states
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setfilteredTodos] = useState([]);

  // RUN ONCE when the app start

  useEffect(() => {
    getLocalTodos();
  }, []);

  //use effect

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  // events

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setfilteredTodos(todos.filter((todo) => todo.completed == true));
        break;
      case "uncompleted":
        setfilteredTodos(todos.filter((todo) => todo.completed == false));
        break;
      default:
        setfilteredTodos(todos);
        break;
    }
  };

  // save to local

  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
  }

    const getLocalTodos = () => {
      if (localStorage.getItem("todos") === null) {
        localStorage.setItem("todos", JSON.stringify([]));
      } else {
        let todoLocal = JSON.parse(localStorage.getItem("todos"));
        setTodos(todoLocal);
      }
    };

  return (
    <div className="App">
      <header>
        <h1> Rain's Todo </h1>
      </header>
      <Form
        todos={todos}
        setStatus={setStatus}
        inputText={inputText}
        setTodos={setTodos}
        setInputText={setInputText}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
