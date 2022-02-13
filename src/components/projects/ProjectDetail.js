import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ProjectDetailTitle from "./ProjectDetailTitle";
import ProjectDetailInfo from "./ProjectDetailInfo";
import ProjectDetailSchedule from "./ProjectDetailSchedule";

const ProjectDetail = ({ projectSelected, status, setStatus }) => {
  const projects = useSelector((state) => state.projects.all);

  const [projectData, setProjectData] = useState();

  useEffect(() => {
    setProjectData(
      projects.find((project) => {
        return project.id.match(new RegExp(projectSelected, "gi"));
      })
    );
  }, [projects, projectSelected]);

  return (
    <>
      {projectData && (
        <div className="project-detail">
          <ProjectDetailTitle projectData={projectData} />
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
