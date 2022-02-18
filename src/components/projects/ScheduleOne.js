import { useEffect, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

import { EditPen } from "../reusable/EditGroup";
import EditWork from "../reusable/EditWork";
import useScrollBlock from "../../utils/useScrollBlock";

const ScheduleOne = ({
  work,
  projectData,
  status,
  setStatus,
  formValue,
  setFormValue,
  setIsWorkBoxOpen,
}) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  const [pjEditWorkOpen, setPjEditWorkOpen] = useState(false);
  const [smallCalendarOpen, setSmallCalendarOpen] = useState(false);

  const handleEditPJWork = () => {
    if (status.project !== "view") {
      setIsWorkBoxOpen(true);
    }
    setPjEditWorkOpen(true);
    setStatus({ ...status, work: "edit-pj" });
    blockScroll();
  };

  useEffect(() => {
    const handleCloseSmallCalendar = (e) => {
      if (!smallCalendarOpen) return;
      if (e.target.classList.contains("transparent-backdrop")) {
        setSmallCalendarOpen(false);
      }
    };

    window.addEventListener("click", handleCloseSmallCalendar, {
      passive: true,
    });
    return () => window.removeEventListener("click", handleCloseSmallCalendar);
  }, [smallCalendarOpen]);

  return (
    <>
      {pjEditWorkOpen && (
        <EditWork
          status={status}
          allowScroll={allowScroll}
          setPjEditWorkOpen={setPjEditWorkOpen}
          projectData={projectData}
          work={work}
          formValue={formValue}
          setFormValue={setFormValue}
          setIsWorkBoxOpen={setIsWorkBoxOpen}
        />
      )}

      <div className="m-text center">{work.deadline}</div>
      <div className="m-text">{work.content}</div>
      <div className="m-text center edit-color pointer small-calendar-container">
        <span onClick={() => setSmallCalendarOpen(true)}>檢視月曆</span>
        {smallCalendarOpen && (
          <Calendar
            value={work.todoDate}
            multiple="true"
            showOtherDays
            readOnly
            className="small-calendar teal"
            plugins={[<DatePanel position={"right"} sort="date" />]}
          />
        )}
      </div>
      <div className="m-text center">{work.finishDate}</div>
      <div onClick={handleEditPJWork}>
        <EditPen text="編輯" />
      </div>
      {smallCalendarOpen && <div className="transparent-backdrop"></div>}
    </>
  );
};

export default ScheduleOne;
