import { useEffect, useState } from "react";

import { DecorationTitle } from "../reusable/DecorationTitle";
import { formData } from "../../data";

const EditProjectInfo = ({
  status,
  projectData,
  formValue,
  setFormValue,
  editCancel,
  setEditCancel,
}) => {
  const [title, setTitle] = useState();

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  //依據status呈現不同內容
  useEffect(() => {
    if (!status) return;

    switch (status.project) {
      case "create":
        setTitle("建立新專案");
        break;
      case "edit":
        if (!projectData) return;

        setTitle("編輯專案設定");

        if (editCancel) {
          setFormValue((prevValue) => {
            return {
              ...prevValue,
              title: projectData.title,
              shortTitle: projectData.shortTitle,
              info: projectData.info,
            };
          });
          setEditCancel(false);
        } else {
          if (
            (formValue.title && formValue.title !== projectData.title) ||
            (formValue.shortTitle &&
              formValue.shortTitle !== projectData.shortTitle) ||
            (formValue.info && formValue.info !== projectData.info)
          ) {
            return;
          } else {
            setFormValue((prevValue) => {
              return {
                ...prevValue,
                title: projectData.title,
                shortTitle: projectData.shortTitle,
                info: projectData.info,
              };
            });
          }
        }
        break;
      default:
        break;
    }
  }, [projectData, status]);

  return (
    <>
      {formValue && (
        <div className="edit-project-info">
          <DecorationTitle title={title} fontSize="l" />
          <form>
            <label htmlFor="project-name" className="m-text">
              專案名稱
            </label>
            <input
              type="text"
              id="project-name"
              name="title"
              maxLength="20"
              className="s-text"
              value={formValue.title || ""}
              onChange={handleValueChange}
            />
            <div className="xs-text gray-color">{formData.limit20}</div>

            <label htmlFor="project-simple" className="m-text">
              專案簡稱
            </label>
            <input
              type="text"
              id="project-simple"
              name="shortTitle"
              maxLength="5"
              className="s-text"
              value={formValue.shortTitle || ""}
              onChange={handleValueChange}
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
              name="info"
              maxLength="70"
              className="s-text"
              value={formValue.info || ""}
              onChange={handleValueChange}
            ></textarea>
            <div className="xs-text gray-color">{formData.limit70}</div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditProjectInfo;
