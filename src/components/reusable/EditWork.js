import { useState, useEffect } from "react";

import Backdrop from "./Backdrop";
import { IconSelector } from "./IconSelector";
import { DecorationTitle } from "./DecorationTitle";
import { SelectCalendar } from "./EditGroup";
import { SmallButtonDark } from "./ButtonCollection";
import AlertMessage from "./AlertMessage";
import { formData } from "../../data";

const EditWork = ({
  status,
  setStatus,
  allowScroll,
  setEventPopover,
  eventSelected,
  setPjEditWorkOpen,
  projectData,
  work,
  setTdEditWorkOpen,
  todo,
}) => {
  const [title, setTitle] = useState();

  const handleEditWorkClose = () => {
    switch (status.page) {
      case "CLD":
        setEventPopover(false);
        allowScroll();
        break;
      case "PJ":
        setPjEditWorkOpen(false);
        setStatus({ ...status, action: "view-project" });
        allowScroll();
        break;
      case "TD":
        setTdEditWorkOpen(false);
        allowScroll();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (status.action) {
      case "create-pj-work":
        setTitle(["新增工作細項", ""]);
        break;
      case "edit-pj-work":
        setTitle(["編輯工作細項", "工作細項完成 / 刪除"]);
        break;
      case "create-td-work":
        setTitle(["新增待辦事項", ""]);
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
        {title && (
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
              {status.action === "create-pj-work" ||
              status.action === "create-td-work" ? (
                <SelectCalendar text="選擇" />
              ) : (
                <div>
                  <div className="m-text">
                    {work ? work.deadline : todo.deadline}
                  </div>
                  <SelectCalendar text="編輯" />
                </div>
              )}

              <div className="m-text">執行日期</div>
              {status.action === "create-pj-work" ||
              status.action === "create-td-work" ? (
                <SelectCalendar text="選擇" />
              ) : (
                <SelectCalendar text="檢視/編輯" />
              )}

              <div className="m-text">執行內容</div>
              <input
                type="text"
                maxLength="30"
                className="s-text"
                value={work ? work.content : todo ? todo.content : ""}
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
                value={work ? work.remark : todo ? todo.remark : ""}
              ></textarea>
              <div></div>
              <div className="xs-text gray-color limit">
                {formData.limit100}
              </div>
            </div>

            {status.action === "create-pj-work" ||
            status.action === "create-td-work" ? null : (
              <>
                <DecorationTitle title={title[1]} fontSize="m" />
                <div className="edit-work-final">
                  <div className="m-text">實際完成日</div>
                  {(work && work.finishDate === "未完成") ||
                  (todo && todo.finishDate === "未完成") ? (
                    <SelectCalendar text="選擇" />
                  ) : (
                    <div>
                      <div className="m-text">
                        {work ? work.finishDate : todo.finishDate}
                      </div>
                      <SelectCalendar text="編輯" />
                    </div>
                  )}

                  <div className="m-text">刪除工作細項</div>
                  <div className="pointer">
                    <IconSelector name="delete" />
                  </div>
                </div>
              </>
            )}
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

export default EditWork;
