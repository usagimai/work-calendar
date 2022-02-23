import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

//CSS
import "./app.scss";
import "./teal.css";
//components
import NotAvailable from "./pages/NotAvailable";
import Nav from "./components/nav/Nav";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Projects";
import Todos from "./pages/Todos";
//others
import { loadProjects } from "./actions/projectsAction";
import { loadTodos } from "./actions/todosAction";
import { app, auth } from "./firebase-config";

function App() {
  const dispatch = useDispatch();

  const [user, setUser] = useState();
  const [status, setStatus] = useState({ page: "", project: "", work: "" });
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  const handleNotAvailable = () => {
    if (window.matchMedia("(max-width: 1280px)").matches) {
      setIsSmallDevice(true);
    } else {
      setIsSmallDevice(false);
    }
  };

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

  //初次進入頁面進行判斷 & 監聽螢幕尺寸變動 (寬度小於1280px不支援)
  useEffect(() => {
    if (window.innerWidth < 1280) {
      setIsSmallDevice(true);
    } else {
      setIsSmallDevice(false);
    }

    const handleNotAvailable = () => {
      if (window.innerWidth < 1280) {
        setIsSmallDevice(true);
      } else {
        setIsSmallDevice(false);
      }
    };

    window.addEventListener("resize", handleNotAvailable, {
      passive: true,
    });
    return () => window.removeEventListener("resize", handleNotAvailable);
  }, []);

  return (
    <>
      {isSmallDevice && <NotAvailable />}
      {!isSmallDevice && (
        <>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/calendar"
              element={<Calendar status={status} setStatus={setStatus} />}
            />
            <Route
              path="/projects/"
              element={<Projects status={status} setStatus={setStatus} />}
            />
            <Route
              path="/todos"
              element={<Todos status={status} setStatus={setStatus} />}
            />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
