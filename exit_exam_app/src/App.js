import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import AddTask from "./components/AddTask";
import Main from "./components/Main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/addtask" element={<Main child={<AddTask />} />} />
    </Routes>
  );
}

export default App;
