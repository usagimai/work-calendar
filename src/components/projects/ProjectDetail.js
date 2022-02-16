import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ProjectDetailTitle from "./ProjectDetailTitle";
import ProjectDetailInfo from "./ProjectDetailInfo";
import ProjectDetailSchedule from "./ProjectDetailSchedule";

const ProjectDetail = ({
  projectSelected,
  status,
  setStatus,
  setEditPJClicked,
}) => {
  const projects = useSelector((state) => state.projects.all);

  const [projectData, setProjectData] = useState();

  useEffect(() => {
    setProjectData(
      projects.find((project) => {
        return project.id.match(new RegExp(projectSelected, "gi"));
      })
    );
  }, [projects, projectSelected]);

  useEffect(() => {
    //設定操作status的「動作資訊」(若只瀏覽專案的話，不顯示選擇/編輯日期的icon)
    setStatus({ ...status, project: "view" });
  }, []);

  return (
    <>
      {projectData && (
        <div className="project-detail">
          <ProjectDetailTitle
            projectData={projectData}
            status={status}
            setStatus={setStatus}
            setEditPJClicked={setEditPJClicked}
          />
          <ProjectDetailInfo projectData={projectData} />
          <ProjectDetailSchedule
            projectData={projectData}
            status={status}
            setStatus={setStatus}
          />
        </div>
      )}
    </>
  );
};

export default ProjectDetail;
