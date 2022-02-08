import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import ProjectList from "../components/projects/ProjectList";
import EditProjectDetail from "../components/projects/EditProjectDetail";
import { app, auth } from "../firebase-config";

const CreateProject = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  //驗證登入狀態，若未登入則轉導回首頁
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/", { replace: true });
      }
    });
  }, []);

  //未登入狀態進入此頁面不顯示內容
  if (!user) return null;

  return (
    <div className="main-frame">
      <ProjectList />
      <EditProjectDetail title="建立新專案" />
    </div>
  );
};

export default CreateProject;
