import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import ScrollTop from "../components/reusable/ScrollTop";
import FindTodos from "../components/todos/FindTodos";
import TodoList from "../components/todos/TodoList";
import { app, auth } from "../firebase-config";

const Todos = ({ status, setStatus }) => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [findMethod, setFindMethod] = useState({
    filter: "未完成",
    sort: "CDNO",
    search: "",
  });

  useEffect(() => {
    //驗證登入狀態，若未登入則轉導回首頁
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/", { replace: true });
      }
    });

    //設定操作status的「頁面資訊」
    setStatus({ ...status, page: "TD" });
  }, []);

  //未登入狀態進入此頁面不顯示內容
  if (!user) return null;

  return (
    <div className="main-frame">
      <FindTodos findMethod={findMethod} setFindMethod={setFindMethod} />
      <TodoList findMethod={findMethod} status={status} setStatus={setStatus} />
      <ScrollTop />
    </div>
  );
};

export default Todos;
