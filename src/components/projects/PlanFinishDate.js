import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import moment from "moment";

import { SelectCalendar } from "../reusable/EditGroup";
import EditWork from "../reusable/EditWork";
import useScrollBlock from "../../utils/useScrollBlock";

const PlanFinishDate = ({
  projectData,
  status,
  setStatus,
  formValue,
  setFormValue,
  editCancel,
  setEditCancel,
  isWorkBoxOpen,
  setIsWorkBoxOpen,
  blankAlert,
}) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  const [pjEditWorkOpen, setPjEditWorkOpen] = useState(false);

  const handleCreatePJWork = () => {
    if (status.project !== "view") {
      setIsWorkBoxOpen(true);
    }

    setPjEditWorkOpen(true);
    setStatus({ ...status, work: "create-pj" });
    blockScroll();
  };

  const handleValueChange = (value) => {
    setFormValue((prevValue) => {
      return {
        ...prevValue,
        planFinishDate: moment(value.toDate()).format("YYYY/MM/DD"),
      };
    });
  };

  //依據status呈現不同內容
  useEffect(() => {
    if (!projectData || !status) return;

    switch (status.project) {
      case "create":
        //點開「新增工作細項」或「編輯工作細項」的狀況 (不變動formValue的資料)
        if (isWorkBoxOpen) {
          return;
        } else {
          //初次進入的狀況 (載入預設值)
          setFormValue((prevValue) => {
            return {
              ...prevValue,
              planFinishDate: "待設定",
            };
          });
        }
        break;

      case "edit":
        //點選取消的狀況 (恢復資料庫中的資料)
        if (editCancel) {
          setFormValue((prevValue) => {
            return {
              ...prevValue,
              planFinishDate: projectData.planFinishDate,
            };
          });
          setEditCancel(false);
        } else {
          //點開「新增工作細項」或「編輯工作細項」的狀況 (不變動formValue的資料)
          if (isWorkBoxOpen) {
            return;
          } else {
            //初次進入的狀況 (載入資料庫中的資料)
            setFormValue((prevValue) => {
              return {
                ...prevValue,
                planFinishDate: projectData.planFinishDate,
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
      {pjEditWorkOpen && (
        <EditWork
          status={status}
          allowScroll={allowScroll}
          setPjEditWorkOpen={setPjEditWorkOpen}
          projectData={projectData}
          formValue={formValue}
          setFormValue={setFormValue}
          setIsWorkBoxOpen={setIsWorkBoxOpen}
        />
      )}
      {status && (projectData || formValue) && (
        <div className="plan-finish-date">
          <div className="m-text red-color">
            {status.project === "view"
              ? projectData.planFinishDate
              : formValue.planFinishDate !== "待設定"
              ? formValue.planFinishDate
              : null}
          </div>
          <div className="m-text">專案預定完成日</div>
          {status.project === "view" ? (
            <div></div>
          ) : formValue.planFinishDate === "待設定" ? (
            <DatePicker
              value={formValue.planFinishDate}
              onChange={handleValueChange}
              className="teal"
              render={(value, openCalendar) => {
                return (
                  <div
                    onClick={openCalendar}
                    className={`datepicker-container ${
                      blankAlert.planFinishDate ? "blank-alert" : undefined
                    }`}
                  >
                    <SelectCalendar text="選擇" />
                  </div>
                );
              }}
            />
          ) : (
            <DatePicker
              value={formValue.planFinishDate}
              onChange={handleValueChange}
              className="teal"
              render={(value, openCalendar) => {
                return (
                  <div onClick={openCalendar} className="datepicker-container">
                    <SelectCalendar text="編輯" />
                  </div>
                );
              }}
            />
          )}
          <div className="s-text pointer" onClick={handleCreatePJWork}>
            新增工作細項 ＋
          </div>
        </div>
      )}
    </>
  );
};

export default PlanFinishDate;
