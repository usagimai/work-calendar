import ProjectDetailTitle from "./ProjectDetailTitle";
import ProjectDetailInfo from "./ProjectDetailInfo";
import ProjectDetailSchedule from "./ProjectDetailSchedule";

const ProjectDetail = () => {
  return (
    <div className="project-detail">
      <ProjectDetailTitle />
      <ProjectDetailInfo />
      <ProjectDetailSchedule />
    </div>
  );
};

export default ProjectDetail;
