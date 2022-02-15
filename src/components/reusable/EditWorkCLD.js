import { useState, useEffect } from "react";

import Backdrop from "./Backdrop";
import { IconSelector } from "./IconSelector";
import { DecorationTitle } from "./DecorationTitle";
import { SelectCalendar } from "./EditGroup";
import { SmallButtonDark } from "./ButtonCollection";
import AlertMessage from "./AlertMessage";
import { formData } from "../../data";

const EditWorkCLD = ({
  status,
  allowScroll,
  setEventPopover,
  eventSelected,
  projects,
  todos,
}) => {
  const [title, setTitle] = useState();
  const [projectData, setProjectData] = useState();
  const [workData, setWorkData] = useState();

  const handleEditWorkClose = () => {
    setEventPopover(false);
    allowScroll();
  };

  useEffect(() => {
    if (!projects || !todos) return;

    switch (eventSelected.resource[0]) {
      case "projects":
        const selectedProject = projects.find((project) => {
          return project.id === eventSelected.resource[1];
        });
        setProjectData(selectedProject);

        const selectedWork = selectedProject.works.find((work) => {
          return eventSelected.title.match(new RegExp(work.content, "gi"));
        });
        setWorkData(selectedWork);
        break;
      case "todos":
        const selectedTodo = todos.find((todo) => {
          return todo.id === eventSelected.resource[1];
        });
        setWorkData(selectedTodo);
        break;
      default:
        break;
    }
  }, [projects]);

  useEffect(() => {
    switch (status.action) {
      case "edit-pj-work":
        setTitle(["編輯工作細項", "工作細項完成 / 刪除"]);
        break;
      case "edit-td-work":
        setTitle(["編輯待辦事項", "待辦事項完成 / 刪除"]);
        break;
      default:
        break;
    }
  }, []);

  return (
    <Backdrop>
      <div className="white-container create-white-container">
        <div className="close-bg" onClick={handleEditWorkClose}>
          <IconSelector name="close" />
        </div>
        {title && workData && (
          <div className="create-content">
            <div>
              <DecorationTitle title={title[0]} fontSize="m" />
              <div className="m-text short-title">
                {projectData && projectData.shortTitle
                  ? `【${projectData.shortTitle}】`
                  : ""}
              </div>
            </div>
            <div className="edit-work-info">
              <div className="m-text">完成期限</div>
              <div>
                <div className="m-text">{workData.deadline}</div>
                <SelectCalendar text="編輯" />
              </div>

              <div className="m-text">執行日期</div>
              <SelectCalendar text="檢視/編輯" />

              <div className="m-text">執行內容</div>
              <input
                type="text"
                maxLength="30"
                className="s-text"
                value={workData.content}
              />
              <div></div>
              <div className="xs-text gray-color limit">{formData.limit30}</div>
              <div className="m-text">
                其他說明
                <br />
                <span className="xs-text gray-color">
                  {formData.notNecessary}
                </span>
              </div>
              <textarea
                maxLength="100"
                className="s-text"
                value={workData.remark ? workData.remark : ""}
              ></textarea>
              <div></div>
              <div className="xs-text gray-color limit">
                {formData.limit100}
              </div>
            </div>

            <DecorationTitle title={title[1]} fontSize="m" />
            <div className="edit-work-final">
              <div className="m-text">實際完成日</div>
              {workData.finishDate === "未完成" ? (
                <SelectCalendar text="選擇" />
              ) : (
                <div>
                  <div className="m-text">{workData.finishDate}</div>
                  <SelectCalendar text="編輯" />
                </div>
              )}

              <div className="m-text">刪除工作細項</div>
              <div className="pointer">
                <IconSelector name="delete" />
              </div>
            </div>
          </div>
        )}

        <div>
          {/* <AlertMessage type="alert2" /> */}
          <SmallButtonDark text="儲存" />
        </div>
      </div>
    </Backdrop>
  );
};

export default EditWorkCLD;
