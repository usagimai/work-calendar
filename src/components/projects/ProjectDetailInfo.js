const ProjectDetailInfo = () => {
  return (
    <div className="project-detail-info">
      <div className="info-container-first">
        <div className="s-text">專案簡稱</div>
        <div className="m-text">工作行事曆</div>
      </div>
      <div className="info-container-middle">
        <div className="s-text">建立日期</div>
        <div className="m-text">2022/01/26</div>
      </div>
      <div className="info-container-middle">
        <div className="s-text">完成日期</div>
        <div className="m-text red-color">進行中</div>
      </div>
      <div className="info-container-last">
        <div className="s-text">專案說明</div>
        <div className="m-text">
          使用「行事曆」及「專案」兩個面向來進行工作規劃的APP
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailInfo;
