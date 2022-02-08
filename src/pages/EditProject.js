import ProjectList from "../components/projects/ProjectList";
import EditProjectDetail from "../components/projects/EditProjectDetail";

const EditProject = () => {
  return (
    <div className="main-frame">
      <ProjectList />
      <EditProjectDetail title="編輯專案設定" />
    </div>
  );
};

export default EditProject;
