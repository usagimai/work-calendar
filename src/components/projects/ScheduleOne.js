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
  const [workHovered, setWorkHovered] = useState();

  const handleEditPJWork = () => {
    if (status.project !== "view") {
      setIsWorkBoxOpen(true);
    }
    setPjEditWorkOpen(true);
    setStatus({ ...status, work: "edit-pj" });
    blockScroll();
  };

  const handleMouseEnter = (e) => {
    setWorkHovered(e.target.getAttribute("data-id"));
  };

  const handleMouseLeave = (e) => {
    setWorkHovered();
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

      <div
        className={`schedule-content m-text center first-column ${
          workHovered === work.id ? "show-bg" : ""
        }`}
        data-id={work.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {work.deadline}
      </div>
      <div
        className={`schedule-content m-text ${
          workHovered === work.id ? "show-bg" : ""
        }`}
        data-id={work.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {work.content}
      </div>
      <div
        className={`schedule-content m-text center edit-color pointer small-calendar-container ${
          workHovered === work.id ? "show-bg" : ""
        }`}
        data-id={work.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
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
      <div
        className={`schedule-content m-text center ${
          workHovered === work.id ? "show-bg" : ""
        }`}
        data-id={work.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {work.finishDate}
      </div>
      <div
        className={`schedule-content last-column ${
          workHovered === work.id ? "show-bg" : ""
        }`}
        data-id={work.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleEditPJWork}
      >
        <EditPen text="編輯" />
      </div>
      {smallCalendarOpen && <div className="transparent-backdrop"></div>}
    </>
  );
};

export default ScheduleOne;
