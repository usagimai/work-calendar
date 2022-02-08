import ProjectList from "../components/projects/ProjectList";
import EditProjectDetail from "../components/projects/EditProjectDetail";

const CreateProject = () => {
  return (
    <div className="main-frame">
      <ProjectList />
      <EditProjectDetail title="建立新專案" />
    </div>
  );
};

export default CreateProject;
