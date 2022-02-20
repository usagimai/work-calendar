import { useState, useEffect } from "react";
import { Calendar } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

import { EditPen } from "../reusable/EditGroup";
import EditWork from "../reusable/EditWork";
import useScrollBlock from "../../utils/useScrollBlock";

const TodoListOne = ({ todo, status, setStatus }) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  const [smallCalendarOpen, setSmallCalendarOpen] = useState(false);
  const [tdEditWorkOpen, setTdEditWorkOpen] = useState(false);
  const [todoHovered, setTodoHovered] = useState();

  const handleEditTDWork = () => {
    setTdEditWorkOpen(true);
    setStatus({ ...status, work: "edit-td" });
    blockScroll();
  };

  const handleMouseEnter = (e) => {
    setTodoHovered(e.target.getAttribute("data-id"));
  };

  const handleMouseLeave = (e) => {
    setTodoHovered();
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
      {tdEditWorkOpen && (
        <EditWork
          status={status}
          allowScroll={allowScroll}
          setTdEditWorkOpen={setTdEditWorkOpen}
          todo={todo}
        />
      )}
      <div
        className={`schedule-content m-text center first-column ${
          todoHovered === todo.id ? "show-bg" : ""
        }`}
        data-id={todo.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {todo.deadline}
      </div>
      <div
        className={`schedule-content m-text ${
          todoHovered === todo.id ? "show-bg" : ""
        }`}
        data-id={todo.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {todo.content}
      </div>
      <div
        className={`schedule-content m-text center edit-color pointer small-calendar-container ${
          todoHovered === todo.id ? "show-bg" : ""
        }`}
        data-id={todo.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span onClick={() => setSmallCalendarOpen(true)}>檢視月曆</span>
        {smallCalendarOpen && (
          <Calendar
            value={todo.todoDate}
            multiple="true"
            showOtherDays
            readOnly
            className="small-calendar teal"
            plugins={[
              <DatePanel
                position="right"
                sort="date"
                removeButton={false}
                header="日期一覽"
              />,
            ]}
          />
        )}
      </div>
      <div
        className={`schedule-content m-text center ${
          todoHovered === todo.id ? "show-bg" : ""
        }`}
        data-id={todo.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {todo.finishDate}
      </div>
      <div
        className={`schedule-content last-column ${
          todoHovered === todo.id ? "show-bg" : ""
        }`}
        data-id={todo.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleEditTDWork}
      >
        <EditPen text="編輯" />
      </div>

      {smallCalendarOpen && <div className="transparent-backdrop"></div>}
    </>
  );
};

export default TodoListOne;
