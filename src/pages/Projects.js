import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import ProjectList from "../components/projects/ProjectList";
import ProjectDetail from "../components/projects/ProjectDetail";
import EmptyMessage from "../components/reusable/EmptyMessage";
import { app, auth } from "../firebase-config";

const Projects = ({ status, setStatus }) => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [projectList, setProjectList] = useState();
  const [projectSelected, setProjectSelected] = useState();

  useEffect(() => {
    //驗證登入狀態，若未登入則轉導回首頁
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/", { replace: true });
      }
    });

    //設定操作status的「頁面資訊」
    setStatus({ ...status, page: "PJ" });
  }, []);

  //未登入狀態進入此頁面不顯示內容
  if (!user) return null;

  return (
    <div className="main-frame">
      <ProjectList
        projectSelected={projectSelected}
        setProjectSelected={setProjectSelected}
        projectList={projectList}
        setProjectList={setProjectList}
      />
      {(projectList && projectList.length > 0) || projectSelected ? (
        <ProjectDetail
          projectSelected={projectSelected}
          status={status}
          setStatus={setStatus}
        />
      ) : (
        <EmptyMessage
          message1="查無專案"
          message2="如欲新增，請透過左方圖示進行"
        />
      )}
    </div>
  );
};

export default Projects;
