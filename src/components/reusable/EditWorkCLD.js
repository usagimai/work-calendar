import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import moment from "moment";
import { doc, updateDoc } from "firebase/firestore";

import Backdrop from "./Backdrop";
import { IconSelector } from "./IconSelector";
import { DecorationTitle } from "./DecorationTitle";
import { SelectCalendar } from "./EditGroup";
import { SmallButtonDark } from "./ButtonCollection";
import AlertMessage from "./AlertMessage";
import { Confirm } from "./Confirm";
import { formData } from "../../data";
import { loadProjects } from "../../actions/projectsAction";
import { loadTodos } from "../../actions/todosAction";
import { app, db } from "../../firebase-config";

const EditWorkCLD = ({
  status,
  allowScroll,
  setEventPopover,
  eventSelected,
  projects,
  todos,
}) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState();
  const [projectData, setProjectData] = useState();
  const [workData, setWorkData] = useState();
  const [alertMessage, setAlertMessage] = useState(false);
  const [deleteWorkBoxOpen, setDeleteWorkBoxOpen] = useState(false);
  const [otherWorksArr, setOtherWorksArr] = useState();
  const [WorkEditedArr, setWorkEditedArr] = useState();
  const [workValue, setWorkValue] = useState({
    deadline: "待設定",
    todoDate: [],
    content: "",
    remark: "",
    finishDate: "未完成",
  });

  const handleEditWorkClose = () => {
    setEventPopover(false);
    allowScroll();
  };

  //管理各項目內容state
  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setWorkValue((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleDeadlineChange = (value) => {
    setWorkValue((prevValue) => {
      return {
        ...prevValue,
        deadline: moment(value.toDate()).format("YYYY/MM/DD"),
      };
    });
  };

  const handleTodoDateChange = (valueArr) => {
    setWorkValue((prevValue) => {
      return {
        ...prevValue,
        todoDate: valueArr.map((value) =>
          moment(value.toDate()).format("YYYY/MM/DD")
        ),
      };
    });
  };

  const handleFinishDateChange = (value) => {
    setWorkValue((prevValue) => {
      return {
        ...prevValue,
        finishDate: moment(value.toDate()).format("YYYY/MM/DD"),
      };
    });
  };

  //點「儲存」後的處理流程
  const handleWorkSubmit = () => {
    //若有必填但未填的項目，顯示alert message
    if (
      workValue.deadline === "待設定" ||
      !workValue.todoDate ||
      workValue.todoDate.length === 0 ||
      !workValue.content
    ) {
      setAlertMessage(true);
      return;
    } else {
      setAlertMessage(false);
    }

    //依據status決定資料submit處理方式
    switch (status.work) {
      case "edit-pj":
        updateDoc(doc(db, "projects", projectData.id), {
          works: WorkEditedArr,
        })
          .then(() => dispatch(loadProjects()))
          .catch((error) => {
            console.log("edit pj error");
          });
        break;
      case "edit-td":
        updateDoc(doc(db, "todos", workData.id), {
          deadline: workValue.deadline,
          content: workValue.content,
          remark: workValue.remark,
          todoDate: workValue.todoDate,
          finishDate: workValue.finishDate,
        })
          .then(() => dispatch(loadTodos()))
          .catch((error) => {
            console.log("edit td error");
          });
        break;
      default:
        break;
    }

    handleEditWorkClose();
  };

  useEffect(() => {
    if (!projectData || !workData) return;

    //編輯/刪除工作細項用Array
    const prevWorks = projectData.works;
    const updateWork = prevWorks.find((work) => {
      return work.id === workData.id;
    });
    const updatedWork = Object.assign({}, updateWork, {
      deadline: workValue.deadline,
      content: workValue.content,
      remark: workValue.remark,
      todoDate: workValue.todoDate,
      finishDate: workValue.finishDate,
    });
    const otherPrevWorks = prevWorks.filter((work) => {
      return work.id !== workData.id;
    });
    setOtherWorksArr(otherPrevWorks);

    const newWorks = [...otherPrevWorks, updatedWork];
    setWorkEditedArr(newWorks);
  }, [projectData, workData, workValue]);

  useEffect(() => {
    if (!workData) return;
    //工作細項/待辦事項之初始資料
    setWorkValue({
      deadline: workData.deadline,
      content: workData.content,
      remark: workData.remark,
      todoDate: workData.todoDate,
      finishDate: workData.finishDate,
    });
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
        setTitle(["編輯工作細項", "工作細項完成 / 刪除", "刪除工作細項"]);
        break;
      case "edit-td":
        setTitle(["編輯待辦事項", "待辦事項完成 / 刪除", "刪除待辦事項"]);
        break;
      default:
        break;
    }
  }, []);

  return (
    <>
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
                  <div className="m-text">{workValue.deadline}</div>
                  <DatePicker
                    value={workValue.deadline}
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
                  {!workValue.todoDate || workValue.todoDate.length === 0 ? (
                    <DatePicker
                      value={workValue.todoDate}
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
                  ) : (
                    <DatePicker
                      value={workValue.todoDate}
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
                  )}
                </div>

                <div className="m-text">執行內容</div>
                <input
                  type="text"
                  name="content"
                  maxLength="30"
                  className="s-text"
                  value={workValue.content}
                  onChange={handleValueChange}
                />
                <div></div>
                <div className="xs-text gray-color limit">
                  {formData.limit30}
                </div>

                <div className="m-text">
                  其他說明
                  <br />
                  <span className="xs-text gray-color">
                    {formData.notNecessary}
                  </span>
                </div>
                <textarea
                  name="remark"
                  maxLength="100"
                  className="s-text"
                  value={workValue.remark}
                  onChange={handleValueChange}
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
                  {workValue.finishDate &&
                    workValue.finishDate !== "未完成" && (
                      <div className="m-text">{workValue.finishDate}</div>
                    )}
                  {workValue.finishDate === "未完成" ? (
                    <DatePicker
                      value={workValue.finishDate}
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
                      value={workValue.finishDate}
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

                <div className="m-text">{title[2]}</div>
                <div
                  className="pointer"
                  onClick={() => setDeleteWorkBoxOpen(true)}
                >
                  <IconSelector name="delete" />
                </div>
              </div>
            </div>
          )}

          <div>
            {alertMessage && <AlertMessage type="alert2" />}
            <div onClick={handleWorkSubmit}>
              <SmallButtonDark text="儲存" />
            </div>
          </div>
        </div>
      </Backdrop>
      {deleteWorkBoxOpen && (
        <Confirm
          message1={
            (status.work === "edit-pj" && "工作細項刪除後無法復原，") ||
            (status.work === "edit-td" && "待辦事項刪除後無法復原，")
          }
          message2="是否確認刪除?"
          confirmFor={
            (status.work === "edit-pj" && "deleteWork") ||
            (status.work === "edit-td" && "deleteTodo")
          }
          setDeleteWorkBoxOpen={setDeleteWorkBoxOpen}
          setEditWorkBoxOpen={setEventPopover}
          allowScroll={allowScroll}
          todo={workData}
          projectData={projectData}
          otherWorksArr={otherWorksArr}
        />
      )}
    </>
  );
};

export default EditWorkCLD;
