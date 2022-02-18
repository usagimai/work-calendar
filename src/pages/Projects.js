import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import EmptyMessage from "../components/reusable/EmptyMessage";
import ProjectList from "../components/projects/ProjectList";
import ProjectDetail from "../components/projects/ProjectDetail";
import EditProjectDetail from "../components/projects/EditProjectDetail";
import { app, auth } from "../firebase-config";

const Projects = ({ status, setStatus }) => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [projectList, setProjectList] = useState();
  const [projectSelected, setProjectSelected] = useState();
  const [createPJClicked, setCreatePJClicked] = useState(false);
  const [editPJClicked, setEditPJClicked] = useState(false);
  const [isCreateNewPJ, setIsCreateNewPJ] = useState(false);
  const [projectDeleted, setProjectDeleted] = useState(false);

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
        status={status}
        setStatus={setStatus}
        setCreatePJClicked={setCreatePJClicked}
        setEditPJClicked={setEditPJClicked}
        isCreateNewPJ={isCreateNewPJ}
        setIsCreateNewPJ={setIsCreateNewPJ}
        setProjectDeleted={setProjectDeleted}
      />
      {projectDeleted ? (
        <EmptyMessage message1="專案已刪除" message2="" />
      ) : createPJClicked || editPJClicked ? (
        <EditProjectDetail
          status={status}
          setStatus={setStatus}
          projectSelected={projectSelected}
          setCreatePJClicked={setCreatePJClicked}
          setEditPJClicked={setEditPJClicked}
          setIsCreateNewPJ={setIsCreateNewPJ}
          setProjectDeleted={setProjectDeleted}
        />
      ) : (projectList && projectList.length > 0) || projectSelected ? (
        <ProjectDetail
          projectSelected={projectSelected}
          status={status}
          setStatus={setStatus}
          setEditPJClicked={setEditPJClicked}
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
