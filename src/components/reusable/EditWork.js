import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import moment from "moment";
import { doc, setDoc, updateDoc } from "firebase/firestore";

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
import { app, db, auth } from "../../firebase-config";

const EditWork = ({
  status,
  allowScroll,
  projectData,
  setPjEditWorkOpen,
  work,
  setTdEditWorkOpen,
  todo,
  formValue,
  setFormValue,
  setIsWorkBoxOpen,
}) => {
  const user = auth.currentUser;
  const dispatch = useDispatch();

  const [title, setTitle] = useState();
  const [deadlineValue, setDeadlineValue] = useState();
  const [todoDateValue, setTodoDateValue] = useState();
  const [contentValue, setContentValue] = useState();
  const [remarkValue, setRemarkValue] = useState("");
  const [finishDateValue, setFinishDateValue] = useState();
  const [alertMessage, setAlertMessage] = useState(false);
  const [deleteWorkBoxOpen, setDeleteWorkBoxOpen] = useState(false);
  const [otherWorksArr, setOtherWorksArr] = useState();
  const [WorkEditedArr, setWorkEditedArr] = useState();

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

  //點「儲存」後的處理流程
  const handleWorkSubmit = () => {
    //若有必填但未填的項目，顯示alert message
    if (
      deadlineValue === "待設定" ||
      !todoDateValue ||
      todoDateValue.length === 0 ||
      !contentValue
    ) {
      setAlertMessage(true);
      return;
    } else {
      setAlertMessage(false);
    }

    //依據status決定資料submit處理方式
    const today = moment(new Date()).format("YYYYMMDD");
    const time = new Date().getTime();

    switch (status.work) {
      case "create-pj":
        if (status.project === "view") {
          //在「閱覽專案」的頁面，建立的工作細項直接存至firestore
          const prevWorks = projectData.works;
          const WorkAddedArr = [
            ...prevWorks,
            {
              id: `${today}_${time}`,
              deadline: deadlineValue,
              content: contentValue,
              remark: remarkValue,
              todoDate: todoDateValue,
              finishDate: "未完成",
            },
          ];

          //重複待彙整
          const handleCreatePJ = () => {
            dispatch(loadProjects());
            handleEditWorkClose();
          };

          updateDoc(doc(db, "projects", projectData.id), {
            works: WorkAddedArr,
          })
            .then(() => handleCreatePJ())
            .catch((error) => {
              console.log("create td error");
            });
        } else {
          //在「建立新專案」及「編輯既有專案」的頁面，建立的工作細項暫存於session storage
          const prevWorks = formValue.works;
          const WorkAddedArr = [
            ...prevWorks,
            {
              id: `${today}_${time}`,
              deadline: deadlineValue,
              content: contentValue,
              remark: remarkValue,
              todoDate: todoDateValue,
              finishDate: "未完成",
            },
          ];

          setFormValue((prevValue) => {
            return {
              ...prevValue,
              works: WorkAddedArr,
            };
          });
          handleEditWorkClose();
          setIsWorkBoxOpen(false);
        }

        break;
      case "edit-pj":
        if (status.project === "view") {
          //在「閱覽專案」的頁面，編輯好的工作細項直接存至firestore

          //重複待彙整
          const handleEditPJ = () => {
            dispatch(loadProjects());
            handleEditWorkClose();
          };

          updateDoc(doc(db, "projects", projectData.id), {
            works: WorkEditedArr,
          })
            .then(() => handleEditPJ())
            .catch((error) => {
              console.log("edit pj error");
            });
        } else {
          //在「建立新專案」及「編輯既有專案」的頁面，編輯好的工作細項暫存於session storage
          setFormValue((prevValue) => {
            return {
              ...prevValue,
              works: WorkEditedArr,
            };
          });
          handleEditWorkClose();
          setIsWorkBoxOpen(false);
        }

        break;
      case "create-td":
        //重複待彙整
        const handleCreateTD = () => {
          dispatch(loadTodos());
          handleEditWorkClose();
        };

        setDoc(doc(db, "todos", `${today}_${time}`), {
          email: user.email,
          createDateTime: `${today}${time}`,
          deadline: deadlineValue,
          content: contentValue,
          remark: remarkValue,
          todoDate: todoDateValue,
          finishDate: "未完成",
        })
          .then(() => handleCreateTD())
          .catch((error) => {
            console.log("create td error");
          });

        break;
      case "edit-td":
        //重複待彙整
        const handleEditTD = () => {
          dispatch(loadTodos());
          handleEditWorkClose();
        };

        updateDoc(doc(db, "todos", todo.id), {
          deadline: deadlineValue,
          content: contentValue,
          remark: remarkValue,
          todoDate: todoDateValue,
          finishDate: finishDateValue,
        })
          .then(() => handleEditTD())
          .catch((error) => {
            console.log("edit td error");
          });

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    //編輯/刪除工作細項用Array

    if (status.project === "view") {
      //「閱覽專案」頁面用 (存firestore)
      if (!work || !projectData) return;

      const prevWorks = projectData.works;
      const updateWork = prevWorks.find((prevWork) => {
        return prevWork.id === work.id;
      });
      const updatedWork = Object.assign({}, updateWork, {
        deadline: deadlineValue,
        content: contentValue,
        remark: remarkValue,
        todoDate: todoDateValue,
        finishDate: finishDateValue,
      });
      const otherPrevWorks = prevWorks.filter((prevWork) => {
        return prevWork.id !== work.id;
      });
      setOtherWorksArr(otherPrevWorks);

      const newWorks = [...otherPrevWorks, updatedWork];
      setWorkEditedArr(newWorks);
    } else {
      //「建立新專案」及「編輯既有專案」頁面用 (存session storage)
      if (!work || !formValue) return;

      const prevWorks = formValue.works;
      const updateWork = prevWorks.find((prevWork) => {
        return prevWork.id === work.id;
      });
      const updatedWork = Object.assign({}, updateWork, {
        deadline: deadlineValue,
        content: contentValue,
        remark: remarkValue,
        todoDate: todoDateValue,
        finishDate: finishDateValue,
      });
      const otherPrevWorks = prevWorks.filter((prevWork) => {
        return prevWork.id !== work.id;
      });
      setOtherWorksArr(otherPrevWorks);

      const newWorks = [...otherPrevWorks, updatedWork];
      setWorkEditedArr(newWorks);
    }
  }, [
    projectData,
    work,
    formValue,
    deadlineValue,
    contentValue,
    remarkValue,
    todoDateValue,
    finishDateValue,
  ]);

  //依據status呈現不同內容
  useEffect(() => {
    switch (status.work) {
      case "create-pj":
        setTitle(["新增工作細項", "", ""]);
        setDeadlineValue("待設定");
        break;
      case "edit-pj":
        setTitle(["編輯工作細項", "工作細項完成 / 刪除", "刪除工作細項"]);
        setDeadlineValue(work.deadline);
        setTodoDateValue(work.todoDate);
        setContentValue(work.content);
        setRemarkValue(work.remark);
        setFinishDateValue(work.finishDate);
        break;
      case "create-td":
        setTitle(["新增待辦事項", "", ""]);
        setDeadlineValue("待設定");
        break;
      case "edit-td":
        setTitle(["編輯待辦事項", "待辦事項完成 / 刪除", "刪除待辦事項"]);
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
    <>
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
                  {formValue &&
                  status.project === "create" &&
                  formValue.shortTitle
                    ? `【${formValue.shortTitle}】`
                    : ""}
                  {projectData &&
                  status.project !== "create" &&
                  projectData.shortTitle
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
                  {!todoDateValue || todoDateValue.length === 0 ? (
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
                  ) : (
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
                  )}
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
                <div className="xs-text gray-color limit">
                  {formData.limit30}
                </div>

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

                    <div className="m-text">{title[2]}</div>
                    <div
                      className="pointer"
                      onClick={() => setDeleteWorkBoxOpen(true)}
                    >
                      <IconSelector name="delete" />
                    </div>
                  </div>
                </>
              )}
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
          confirmFor2={status.project !== "view" ? "deleteWorkSession" : null}
          setDeleteWorkBoxOpen={setDeleteWorkBoxOpen}
          setEditWorkBoxOpen={
            (status.work === "edit-pj" && setPjEditWorkOpen) ||
            (status.work === "edit-td" && setTdEditWorkOpen)
          }
          allowScroll={allowScroll}
          todo={todo}
          projectData={projectData}
          otherWorksArr={otherWorksArr}
          setFormValue={setFormValue}
        />
      )}
    </>
  );
};

export default EditWork;
