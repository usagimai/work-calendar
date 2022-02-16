import { useEffect, useState } from "react";

import { DecorationTitle } from "../reusable/DecorationTitle";
import { formData } from "../../data";

const EditProjectInfo = ({ status, projectData }) => {
  const [title, setTitle] = useState();
  const [titleValue, setTitleValue] = useState();
  const [shortTitleValue, setShortTitleValue] = useState();
  const [infoValue, setInfoValue] = useState();

  //管理各項目內容state
  const handleTitleChange = (e) => {
    setTitleValue(e.target.value);
  };

  const handleShortTitleChange = (e) => {
    setShortTitleValue(e.target.value);
  };

  const handleInfoChange = (e) => {
    setInfoValue(e.target.value);
  };

  //依據status呈現不同內容
  useEffect(() => {
    if (!projectData) return;

    switch (status.project) {
      case "create":
        setTitle("建立新專案");
        setTitleValue();
        setShortTitleValue();
        setInfoValue();
        break;
      case "edit":
        setTitle("編輯專案設定");
        setTitleValue(projectData.title);
        setShortTitleValue(projectData.shortTitle);
        setInfoValue(projectData.info);
        break;
      default:
        break;
    }
  }, [projectData, status]);

  return (
    <>
      {projectData && (
        <div className="edit-project-info">
          <DecorationTitle title={title} fontSize="l" />
          <form>
            <label htmlFor="project-name" className="m-text">
              專案名稱
            </label>
            <input
              type="text"
              id="project-name"
              maxLength="20"
              className="s-text"
              value={titleValue || ""}
              onChange={handleTitleChange}
            />
            <div className="xs-text gray-color">{formData.limit20}</div>

            <label htmlFor="project-simple" className="m-text">
              專案簡稱
            </label>
            <input
              type="text"
              id="project-simple"
              maxLength="5"
              className="s-text"
              value={shortTitleValue || ""}
              onChange={handleShortTitleChange}
            />
            <div className="xs-text gray-color">{formData.limit5}</div>

            <label htmlFor="project-detail-info" className="m-text">
              專案說明
              <br />
              <span className="xs-text gray-color">
                {formData.notNecessary}
              </span>
            </label>
            <textarea
              id="project-detail-info"
              maxLength="70"
              className="s-text"
              value={infoValue || ""}
              onChange={handleInfoChange}
            ></textarea>
            <div className="xs-text gray-color">{formData.limit70}</div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditProjectInfo;
