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
  planFinishDateValue,
  setPlanFinishDateValue,
}) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  const [pjEditWorkOpen, setPjEditWorkOpen] = useState(false);

  const handleCreatePJWork = () => {
    setPjEditWorkOpen(true);
    setStatus({ ...status, work: "create-pj" });
    blockScroll();
  };

  const handlePlanFinishDateChange = (value) => {
    setPlanFinishDateValue(moment(value.toDate()).format("YYYY/MM/DD"));
  };

  //依據status呈現不同內容
  useEffect(() => {
    if (!projectData) return;

    switch (status.project) {
      case "create":
        setPlanFinishDateValue("待設定");
        break;
      case "edit":
        setPlanFinishDateValue(projectData.planFinishDate);
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
        />
      )}
      <div className="plan-finish-date">
        <div className="m-text red-color">
          {status.project === "view"
            ? projectData.planFinishDate
            : planFinishDateValue !== "待設定"
            ? planFinishDateValue
            : null}
        </div>
        <div className="m-text">專案預定完成日</div>
        {status.project === "view" ? (
          <div></div>
        ) : planFinishDateValue === "待設定" ? (
          <DatePicker
            value={planFinishDateValue}
            onChange={handlePlanFinishDateChange}
            className="teal"
            render={(value, openCalendar) => {
              return (
                <div onClick={openCalendar} className="datepicker-container">
                  <SelectCalendar text="選擇" />
                </div>
              );
            }}
          />
        ) : (
          <DatePicker
            value={planFinishDateValue}
            onChange={handlePlanFinishDateChange}
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
    </>
  );
};

export default PlanFinishDate;
