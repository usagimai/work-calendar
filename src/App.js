import { Routes, Route } from "react-router-dom";

import "./app.scss";
import Home from "./pages/Home";
import Nav from "./components/nav/Nav";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import EditProject from "./pages/EditProject";
import Todos from "./pages/Todos";

function App() {
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
