import { Link } from "react-router-dom";

import { EditPen } from "../reusable/EditGroup";

const ProjectDetailTitle = ({ projectData }) => {
  return (
    <div className="project-detail-title">
      <div className="l-text center">{projectData.title}</div>
      <Link to={`/edit-project/${projectData.id}`}>
        <EditPen text="編輯專案設定" />
      </Link>
    </div>
  );
};

export default ProjectDetailTitle;
