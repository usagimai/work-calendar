import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import "./app.scss";
//components
import Nav from "./components/nav/Nav";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import EditProject from "./pages/EditProject";
import Todos from "./pages/Todos";
//others
import { loadProjects } from "./actions/projectsAction";
import { loadTodos } from "./actions/todosAction";
import { app, auth } from "./firebase-config";

function App() {
  const dispatch = useDispatch();

  const [user, setUser] = useState();

  //使用Firebase的功能監聽使用者是否登入(若為登入，會從Firebase接收到該使用者的資訊，包含email、UID等)
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  //讀取所有projects及todos
  useEffect(() => {
    if (user) {
      dispatch(loadProjects());
      dispatch(loadTodos());
    }
  }, [user]);

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/projects/" element={<Projects />} />
        <Route path="/projects/:id" element={<Projects />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/edit-project/:id" element={<EditProject />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </>
  );
}

export default App;
