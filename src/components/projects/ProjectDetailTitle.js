import { EditPen } from "../reusable/EditGroup";

const ProjectDetailTitle = ({
  projectData,
  status,
  setStatus,
  setEditPJClicked,
}) => {
  const handleEditPJClicked = () => {
    setEditPJClicked(true);
    setStatus({ ...status, project: "edit" });
  };

  return (
    <div className="project-detail-title">
      <div className="l-text center">{projectData.title}</div>
      <div onClick={handleEditPJClicked}>
        <EditPen text="編輯專案設定" />
      </div>
    </div>
  );
};

export default ProjectDetailTitle;
