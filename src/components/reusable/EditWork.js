import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import moment from "moment";

import Backdrop from "./Backdrop";
import { IconSelector } from "./IconSelector";
import { DecorationTitle } from "./DecorationTitle";
import { SelectCalendar } from "./EditGroup";
import { SmallButtonDark } from "./ButtonCollection";
import AlertMessage from "./AlertMessage";
import { formData } from "../../data";

const EditWork = ({
  status,
  allowScroll,
  projectData,
  setPjEditWorkOpen,
  work,
  setTdEditWorkOpen,
  todo,
}) => {
  const [title, setTitle] = useState();
  const [deadlineValue, setDeadlineValue] = useState();
  const [todoDateValue, setTodoDateValue] = useState();
  const [contentValue, setContentValue] = useState();
  const [remarkValue, setRemarkValue] = useState();
  const [finishDateValue, setFinishDateValue] = useState();

  const handleEditWorkClose = () => {
    switch (status.page) {
      case "PJ":
        setPjEditWorkOpen(false);
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

  //管理各項目內容state
  const handleDeadlineChange = (value) => {
    setDeadlineValue(moment(value.toDate()).format("YYYY/MM/DD"));
  };

  const handleTodoDateChange = (valueArr) => {
    const NewValueArr = valueArr.map((value) =>
      moment(value.toDate()).format("YYYY/MM/DD")
    );
    setTodoDateValue(NewValueArr);
  };

  const handleContentChange = (e) => {
    setContentValue(e.target.value);
  };

  const handleRemarkChange = (e) => {
    setRemarkValue(e.target.value);
  };

  const handleFinishDateChange = (value) => {
    setFinishDateValue(moment(value.toDate()).format("YYYY/MM/DD"));
  };

  //依據status呈現不同內容
  useEffect(() => {
    switch (status.work) {
      case "create-pj":
        setTitle(["新增工作細項", ""]);
        setDeadlineValue("待設定");
        break;
      case "edit-pj":
        setTitle(["編輯工作細項", "工作細項完成 / 刪除"]);
        setDeadlineValue(work.deadline);
        setTodoDateValue(work.todoDate);
        setContentValue(work.content);
        setRemarkValue(work.remark);
        setFinishDateValue(work.finishDate);
        break;
      case "create-td":
        setTitle(["新增待辦事項", ""]);
        setDeadlineValue("待設定");
        break;
      case "edit-td":
        setTitle(["編輯待辦事項", "待辦事項完成 / 刪除"]);
        setDeadlineValue(todo.deadline);
        setTodoDateValue(todo.todoDate);
        setContentValue(todo.content);
        setRemarkValue(todo.remark);
        setFinishDateValue(todo.finishDate);
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
              <div>
                {deadlineValue !== "待設定" && (
                  <div className="m-text">{deadlineValue}</div>
                )}
                {deadlineValue === "待設定" ? (
                  <DatePicker
                    value={deadlineValue}
                    onChange={handleDeadlineChange}
                    className="teal"
                    render={(value, openCalendar) => {
                      return (
                        <div onClick={openCalendar}>
                          <SelectCalendar text="選擇" />
                        </div>
                      );
                    }}
                  />
                ) : (
                  <DatePicker
                    value={deadlineValue}
                    onChange={handleDeadlineChange}
                    className="teal"
                    render={(value, openCalendar) => {
                      return (
                        <div onClick={openCalendar}>
                          <SelectCalendar text="編輯" />
                        </div>
                      );
                    }}
                  />
                )}
              </div>

              <div className="m-text">執行日期</div>
              <div className="datepicker-container">
                {todoDateValue ? (
                  <DatePicker
                    value={todoDateValue}
                    multiple="true"
                    onChange={handleTodoDateChange}
                    className="teal"
                    render={(value, openCalendar) => {
                      return (
                        <div onClick={openCalendar}>
                          <SelectCalendar text="檢視/編輯" />
                        </div>
                      );
                    }}
                    plugins={[<DatePanel position={"right"} sort="date" />]}
                  />
                ) : (
                  <DatePicker
                    value={todoDateValue}
                    multiple="true"
                    onChange={handleTodoDateChange}
                    className="teal"
                    render={(value, openCalendar) => {
                      return (
                        <div onClick={openCalendar}>
                          <SelectCalendar text="選擇" />
                        </div>
                      );
                    }}
                    plugins={[<DatePanel position={"right"} sort="date" />]}
                  />
                )}
              </div>

              <div className="m-text">執行內容</div>
              <input
                type="text"
                maxLength="30"
                className="s-text"
                value={contentValue}
                onChange={handleContentChange}
              />
              <div></div>
              <div className="xs-text gray-color limit">{formData.limit30}</div>

              <div className="m-text">
                其他說明
                <br />
                <span className="xs-text gray-color not-necessary">
                  {formData.notNecessary}
                </span>
              </div>
              <textarea
                maxLength="100"
                className="s-text"
                value={remarkValue}
                onChange={handleRemarkChange}
              ></textarea>
              <div></div>
              <div className="xs-text gray-color limit">
                {formData.limit100}
              </div>
            </div>

            {status.work === "create-pj" ||
            status.work === "create-td" ? null : (
              <>
                <DecorationTitle title={title[1]} fontSize="m" />
                <div className="edit-work-final">
                  <div className="m-text">實際完成日</div>
                  <div>
                    {finishDateValue !== "未完成" && (
                      <div className="m-text">{finishDateValue}</div>
                    )}
                    {finishDateValue === "未完成" ? (
                      <DatePicker
                        value={finishDateValue}
                        onChange={handleFinishDateChange}
                        className="teal"
                        render={(value, openCalendar) => {
                          return (
                            <div onClick={openCalendar}>
                              <SelectCalendar text="選擇" />
                            </div>
                          );
                        }}
                      />
                    ) : (
                      <DatePicker
                        value={finishDateValue}
                        onChange={handleFinishDateChange}
                        className="teal"
                        render={(value, openCalendar) => {
                          return (
                            <div onClick={openCalendar}>
                              <SelectCalendar text="編輯" />
                            </div>
                          );
                        }}
                      />
                    )}
                  </div>

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
