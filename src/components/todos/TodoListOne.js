import { useState, useEffect } from "react";
import { Calendar } from "react-multi-date-picker";

import { EditPen } from "../reusable/EditGroup";
import EditWork from "../reusable/EditWork";
import useScrollBlock from "../../utils/useScrollBlock";
import "../../teal.css";

const TodoListOne = ({ todo, status, setStatus }) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  const [smallCalendarOpen, setSmallCalendarOpen] = useState(false);
  const [tdEditWorkOpen, setTdEditWorkOpen] = useState(false);

  const handleEditTDWork = () => {
    setTdEditWorkOpen(true);
    setStatus({ ...status, action: "edit-td-work" });
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
      {tdEditWorkOpen && (
        <EditWork
          status={status}
          setStatus={setStatus}
          allowScroll={allowScroll}
          setTdEditWorkOpen={setTdEditWorkOpen}
          todo={todo}
        />
      )}
      <div className="m-text center">{todo.deadline}</div>
      <div className="m-text">{todo.content}</div>
      <div className="m-text center edit-color pointer small-calendar-container">
        <span onClick={() => setSmallCalendarOpen(true)}>檢視月曆</span>
        {smallCalendarOpen && (
          <Calendar
            value={todo.todoDate}
            multiple="true"
            showOtherDays
            readOnly
            className="small-calendar teal"
          />
        )}
      </div>
      <div className="m-text center">{todo.finishDate}</div>
      <div onClick={handleEditTDWork}>
        <EditPen text="編輯" />
      </div>

      {smallCalendarOpen && <div className="transparent-backdrop"></div>}
    </>
  );
};

export default TodoListOne;
