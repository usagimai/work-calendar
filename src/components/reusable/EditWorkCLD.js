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
  const [deadlineValue, setDeadlineValue] = useState();
  const [todoDateValue, setTodoDateValue] = useState();
  const [contentValue, setContentValue] = useState();
  const [remarkValue, setRemarkValue] = useState();
  const [finishDateValue, setFinishDateValue] = useState();

  const handleEditWorkClose = () => {
    setEventPopover(false);
    allowScroll();
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

  useEffect(() => {
    if (!workData) return;
    //工作細項/待辦事項之初始資料
    setDeadlineValue(workData.deadline);
    setTodoDateValue(workData.todoDate);
    setContentValue(workData.content);
    setRemarkValue(workData.remark);
    setFinishDateValue(workData.finishDate);
  }, [workData]);

  useEffect(() => {
    //取得該筆工作細項/待辦事項資料
    if (projects || todos) {
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
    }

    //依據status呈現不同內容
    switch (status.work) {
      case "edit-pj":
        setTitle(["編輯工作細項", "工作細項完成 / 刪除"]);
        break;
      case "edit-td":
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
                <div className="m-text">{deadlineValue}</div>
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
              </div>

              <div className="m-text">執行日期</div>
              <div className="datepicker-container">
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
              </div>

              <div className="m-text">執行內容</div>
              <input
                type="text"
                maxLength="30"
                className="s-text"
                value={contentValue || ""}
                onChange={handleContentChange}
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
                value={remarkValue || ""}
                onChange={handleRemarkChange}
              ></textarea>
              <div></div>
              <div className="xs-text gray-color limit">
                {formData.limit100}
              </div>
            </div>

            <DecorationTitle title={title[1]} fontSize="m" />
            <div className="edit-work-final">
              <div className="m-text">實際完成日</div>
              <div>
                {finishDateValue && finishDateValue !== "未完成" && (
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
