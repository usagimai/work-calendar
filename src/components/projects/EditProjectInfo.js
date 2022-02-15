import { useEffect, useState } from "react";

import { DecorationTitle } from "../reusable/DecorationTitle";
import { formData } from "../../data";

const EditProjectInfo = ({ status, projectData }) => {
  const [title, setTitle] = useState();

  useEffect(() => {
    switch (status.action) {
      case "create-project":
        setTitle("建立新專案");
        break;
      case "edit-project":
        setTitle("編輯專案設定");
        break;
      default:
        break;
    }
  }, []);

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
              value={projectData.title}
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
              value={projectData.shortTitle}
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
              value={projectData.info}
            ></textarea>
            <div className="xs-text gray-color">{formData.limit70}</div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditProjectInfo;
