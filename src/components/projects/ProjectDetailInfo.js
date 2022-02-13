const ProjectDetailInfo = ({ projectData }) => {
  return (
    <div className="project-detail-info">
      <div className="info-container-first">
        <div className="s-text">專案簡稱</div>
        <div className="m-text">{projectData.shortTitle}</div>
      </div>
      <div className="info-container-middle">
        <div className="s-text">建立日期</div>
        <div className="m-text">{projectData.createDate}</div>
      </div>
      <div className="info-container-middle">
        <div className="s-text">完成日期</div>
        <div className="m-text red-color">{projectData.finishDate}</div>
      </div>
      <div className="info-container-last">
        <div className="s-text">專案說明</div>
        <div className="m-text">{projectData.info}</div>
      </div>
    </div>
  );
};

export default ProjectDetailInfo;
