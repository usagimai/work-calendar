import ProjectList from "../components/projects/ProjectList";
import ProjectDetail from "../components/projects/ProjectDetail";
import EmptyMessage from "../components/reusable/EmptyMessage";

const Projects = () => {
  return (
    <div className="main-frame">
      <ProjectList />
      {/* 依有無專案顯示不同component */}
      <ProjectDetail />
      {/* <EmptyMessage
        message1="查無專案"
        message2="如欲新增，請透過左方圖示進行"
      /> */}
    </div>
  );
};

export default Projects;
