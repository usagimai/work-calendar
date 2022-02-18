import { useEffect, useRef, useState } from "react";

import { DecorationTitle } from "../reusable/DecorationTitle";
import { IconSelector } from "../reusable/IconSelector";
import ProjectListFind from "./ProjectListFind";
import ProjectListArea from "./ProjectListArea";

const ProjectList = ({
  projectList,
  setProjectList,
  projectSelected,
  setProjectSelected,
  status,
  setStatus,
  setCreatePJClicked,
  setEditPJClicked,
  isCreateNewPJ,
  setIsCreateNewPJ,
  setProjectDeleted,
}) => {
  const createInfoRef = useRef();
  const [overCreate, setOverCreate] = useState(false);
  const [findMethod, setFindMethod] = useState({
    filter: "進行中",
    sort: "CDNO",
    search: "",
  });

  const handleCreatePJClicked = () => {
    setProjectDeleted(false);
    setStatus({ ...status, project: "create" });
    setCreatePJClicked(true);
  };

  useEffect(() => {
    //取得滑鼠座標，定位說明文字
    const handleCursorPosition = (e) => {
      createInfoRef.current.style.top = e.pageY + 10 + "px";
      createInfoRef.current.style.left = e.pageX + 15 + "px";
    };

    window.addEventListener("mousemove", handleCursorPosition, {
      passive: true,
    });
    return () => window.removeEventListener("mousemove", handleCursorPosition);
  }, []);

  return (
    <div className="project-list">
      <div>
        <DecorationTitle title="專案一覽" fontSize="l" />
        <div
          className="pointer"
          onMouseEnter={() => {
            setOverCreate(true);
          }}
          onMouseLeave={() => {
            setOverCreate(false);
          }}
          onClick={handleCreatePJClicked}
        >
          <IconSelector name="create" />
        </div>
      </div>
      <ProjectListFind findMethod={findMethod} setFindMethod={setFindMethod} />
      <ProjectListArea
        findMethod={findMethod}
        projectList={projectList}
        setProjectList={setProjectList}
        projectSelected={projectSelected}
        setProjectSelected={setProjectSelected}
        setCreatePJClicked={setCreatePJClicked}
        setEditPJClicked={setEditPJClicked}
        isCreateNewPJ={isCreateNewPJ}
        setIsCreateNewPJ={setIsCreateNewPJ}
        setProjectDeleted={setProjectDeleted}
      />
      <div
        className={`xs-text center ${
          overCreate ? "create-info" : "create-info-hidden"
        }`}
        ref={createInfoRef}
      >
        建立新專案
      </div>
    </div>
  );
};

export default ProjectList;
