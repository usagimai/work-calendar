import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

const ProjectListArea = ({
  findMethod,
  projectList,
  setProjectList,
  projectSelected,
  setProjectSelected,
  setCreatePJClicked,
  setEditPJClicked,
}) => {
  const projects = useSelector((state) => state.projects.all);
  const firstRendering = useRef(true);

  const [defaultProject, setDefaultProject] = useState();

  const handleProjectSelected = (id) => {
    setProjectSelected(id);
    setCreatePJClicked(false);
    setEditPJClicked(false);
  };

  //篩選、排序、搜尋功能
  useEffect(() => {
    const filteredList = projects.filter((project) => {
      switch (findMethod.filter) {
        case "進行中":
          return project.finishDate.match(new RegExp("進行中", "gi"));
        case "已完成":
          return project.finishDate.indexOf("進行中") === -1;
        case "全部":
          return project;
        default:
          break;
      }
    });
    const sortedList = filteredList.sort((a, b) => {
      switch (findMethod.sort) {
        case "CDNO":
          return new Date(b.createDate) - new Date(a.createDate);
        case "CDON":
          return new Date(a.createDate) - new Date(b.createDate);
        case "FDCF":
          return new Date(a.planFinishDate) - new Date(b.planFinishDate);
        case "FDFC":
          return new Date(b.planFinishDate) - new Date(a.planFinishDate);
        default:
          break;
      }
    });
    const searchResult = sortedList.filter((project) => {
      if (findMethod.search === "") {
        return project;
      } else {
        return project.title.match(new RegExp(findMethod.search, "gi"));
      }
    });
    setProjectList(searchResult);
  }, [projects, findMethod]);

  //預設顯示之專案
  useEffect(() => {
    if (!projectList || projectList.length === 0) return;
    setDefaultProject(projectList[0].id);
  }, [projectList]);

  useEffect(() => {
    if (!firstRendering.current) return;

    setProjectSelected(defaultProject);
    if (defaultProject) {
      firstRendering.current = false;
    }
  }, [defaultProject]);

  return (
    <div className="project-list-area s-text">
      {projectList && projectList.length > 0 ? (
        projectList.map((project) => (
          <div
            key={project.id}
            className={projectSelected === project.id ? "selected" : ""}
            onClick={() => handleProjectSelected(project.id)}
          >
            <span>{project.title}</span>
          </div>
        ))
      ) : (
        <div className="no-project">無專案</div>
      )}
    </div>
  );
};

export default ProjectListArea;
