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
  const [alertMessage, setAlertMessage] = useState(false);
  const [blankAlert, setBlankAlert] = useState({
    deadline: false,
    todoDate: false,
    content: false,
  });
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
    //若有必填欄位未填，顯示提醒訊息 & 該欄位以紅色提示
    if (workValue.deadline === "待設定") {
      setBlankAlert((prevValue) => {
        return {
          ...prevValue,
          deadline: true,
        };
      });
    } else {
      setBlankAlert((prevValue) => {
        return {
          ...prevValue,
          deadline: false,
        };
      });
    }

    if (!workValue.todoDate || workValue.todoDate.length === 0) {
      setBlankAlert((prevValue) => {
        return {
          ...prevValue,
          todoDate: true,
        };
      });
    } else {
      setBlankAlert((prevValue) => {
        return {
          ...prevValue,
          todoDate: false,
        };
      });
    }

    if (!workValue.content) {
      setBlankAlert((prevValue) => {
        return {
          ...prevValue,
          content: true,
        };
      });
    } else {
      setBlankAlert((prevValue) => {
        return {
          ...prevValue,
          content: false,
        };
      });
    }

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
    const today = moment(new Date()).format("YYYYMMDD");
    const time = new Date().getTime();

    const handleCreateEditPJ = () => {
      dispatch(loadProjects());
      handleEditWorkClose();
    };

    const handleCreateEditTD = () => {
      dispatch(loadTodos());
      handleEditWorkClose();
    };

    switch (status.work) {
      case "create-pj":
        if (status.project === "view") {
          //在「閱覽專案」的頁面，建立的工作細項直接存至firestore
          const prevWorks = projectData.works;
          const WorkAddedArr = [
            ...prevWorks,
            {
              id: `${today}_${time}`,
              deadline: workValue.deadline,
              content: workValue.content,
              remark: workValue.remark,
              todoDate: workValue.todoDate,
              finishDate: "未完成",
            },
          ];

          updateDoc(doc(db, "projects", projectData.id), {
            works: WorkAddedArr,
          })
            .then(() => handleCreateEditPJ())
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
              deadline: workValue.deadline,
              content: workValue.content,
              remark: workValue.remark,
              todoDate: workValue.todoDate,
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
          updateDoc(doc(db, "projects", projectData.id), {
            works: WorkEditedArr,
          })
            .then(() => handleCreateEditPJ())
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
        setDoc(doc(db, "todos", `${today}_${time}`), {
          email: user.email,
          createDateTime: `${today}${time}`,
          deadline: workValue.deadline,
          content: workValue.content,
          remark: workValue.remark,
          todoDate: workValue.todoDate,
          finishDate: "未完成",
        })
          .then(() => handleCreateEditTD())
          .catch((error) => {
            console.log("create td error");
          });
        break;

      case "edit-td":
        updateDoc(doc(db, "todos", todo.id), {
          deadline: workValue.deadline,
          content: workValue.content,
          remark: workValue.remark,
          todoDate: workValue.todoDate,
          finishDate: workValue.finishDate,
        })
          .then(() => handleCreateEditTD())
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
        deadline: workValue.deadline,
        content: workValue.content,
        remark: workValue.remark,
        todoDate: workValue.todoDate,
        finishDate: workValue.finishDate,
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
        deadline: workValue.deadline,
        content: workValue.content,
        remark: workValue.remark,
        todoDate: workValue.todoDate,
        finishDate: workValue.finishDate,
      });
      const otherPrevWorks = prevWorks.filter((prevWork) => {
        return prevWork.id !== work.id;
      });
      setOtherWorksArr(otherPrevWorks);

      const newWorks = [...otherPrevWorks, updatedWork];
      setWorkEditedArr(newWorks);
    }
  }, [projectData, work, formValue, workValue]);

  //依據status呈現不同內容
  useEffect(() => {
    switch (status.work) {
      case "create-pj":
        setTitle(["新增工作細項", "", ""]);
        setWorkValue((prevValue) => {
          return {
            ...prevValue,
            deadline: "待設定",
          };
        });
        break;

      case "edit-pj":
        setTitle(["編輯工作細項", "工作細項完成 / 刪除", "刪除工作細項"]);
        setWorkValue({
          deadline: work.deadline,
          content: work.content,
          remark: work.remark,
          todoDate: work.todoDate,
          finishDate: work.finishDate,
        });
        break;

      case "create-td":
        setTitle(["新增待辦事項", "", ""]);
        setWorkValue((prevValue) => {
          return {
            ...prevValue,
            deadline: "待設定",
          };
        });
        break;

      case "edit-td":
        setTitle(["編輯待辦事項", "待辦事項完成 / 刪除", "刪除待辦事項"]);
        setWorkValue({
          deadline: todo.deadline,
          content: todo.content,
          remark: todo.remark,
          todoDate: todo.todoDate,
          finishDate: todo.finishDate,
        });
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
                  {workValue.deadline !== "待設定" && (
                    <div className="m-text">{workValue.deadline}</div>
                  )}
                  {workValue.deadline === "待設定" ? (
                    <DatePicker
                      value={workValue.deadline}
                      onChange={handleDeadlineChange}
                      className="teal"
                      render={(value, openCalendar) => {
                        return (
                          <div
                            onClick={openCalendar}
                            className={
                              blankAlert.deadline ? "blank-alert" : undefined
                            }
                          >
                            <SelectCalendar text="選擇" />
                          </div>
                        );
                      }}
                    />
                  ) : (
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
                  )}
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
                          <div
                            onClick={openCalendar}
                            className={
                              blankAlert.todoDate ? "blank-alert" : undefined
                            }
                          >
                            <SelectCalendar text="選擇" />
                          </div>
                        );
                      }}
                      plugins={[
                        <DatePanel
                          position="right"
                          sort="date"
                          header="日期可複選"
                        />,
                      ]}
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
                      plugins={[
                        <DatePanel
                          position="right"
                          sort="date"
                          header="日期可複選"
                        />,
                      ]}
                    />
                  )}
                </div>

                <div className="m-text">執行內容</div>
                <input
                  type="text"
                  name="content"
                  maxLength="30"
                  className={`s-text ${
                    blankAlert.content ? "blank-alert" : undefined
                  }`}
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
                  <span className="xs-text gray-color not-necessary">
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

              {status.work === "create-pj" ||
              status.work === "create-td" ? null : (
                <>
                  <DecorationTitle title={title[1]} fontSize="m" />
                  <div className="edit-work-final">
                    <div className="m-text">實際完成日</div>
                    <div>
                      {workValue.finishDate !== "未完成" && (
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
