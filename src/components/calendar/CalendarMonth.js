import { useEffect, useState } from "react";
import moment from "moment";
import moment_timezone from "moment-timezone";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useSelector } from "react-redux";

import EditWorkCLD from "../reusable/EditWorkCLD";
import useScrollBlock from "../../utils/useScrollBlock";
import RBCToolbar from "./CalendarToolbar";
import "moment/locale/zh-tw";

const localizer = momentLocalizer(moment_timezone);

const CalendarMonth = ({ status, setStatus }) => {
  const projects = useSelector((state) => state.projects.all);
  const todos = useSelector((state) => state.todos.all);

  const [blockScroll, allowScroll] = useScrollBlock();
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [eventPopover, setEventPopover] = useState(false);
  const [eventSelected, setEventSelected] = useState();

  const handleEventPopover = (eventOne) => {
    if (eventOne.resource[0] === "projects") {
      setStatus({ ...status, action: "edit-pj-work" });
    } else {
      setStatus({ ...status, action: "edit-td-work" });
    }

    setEventPopover(true);
    setEventSelected(eventOne);
    blockScroll();
  };

  useEffect(() => {
    if (!projects || projects.length === 0 || !todos || todos.length === 0)
      return;

    //將projects的工作細項整理成行事曆的資料格式-1 (排除尚未設定工作細項的專案)
    const filteredProjects = projects.filter((project) => {
      return project.works.length !== 0;
    });
    //將projects的工作細項整理成行事曆的資料格式-2 (單個工作細項整理成行事曆的資料格式)
    const eventByPrpject = filteredProjects.map((project) =>
      project.works.map((work) =>
        work.todoDate.map((date) => ({
          title: `【${project.shortTitle}】${work.content}`,
          start: moment(`${date}`).toDate(),
          end: moment(`${date}`).toDate(),
          resource: ["projects", project.id],
        }))
      )
    );
    //將projects的工作細項整理成行事曆的資料格式-3 (將所有工作細項資料整理成array第一層元素)
    const projectEventsT = [];
    const projectEvents = [];
    const pjEventsT = eventByPrpject.map((oneEvent) =>
      projectEventsT.push(...oneEvent)
    );
    const pjEvents = projectEventsT.map((oneEvent) =>
      projectEvents.push(...oneEvent)
    );

    //將todos的待辦事項整理成行事曆的資料格式
    const eventByTodo = todos.map((todo) =>
      todo.todoDate.map((date) => ({
        title: todo.content,
        start: moment(`${date}`).toDate(),
        end: moment(`${date}`).toDate(),
        resource: ["todos", todo.id],
      }))
    );
    const todoEvents = [];
    const tdEvents = eventByTodo.map((oneTdEvent) =>
      todoEvents.push(...oneTdEvent)
    );

    //兩者資料整合在一起
    setCalendarEvents([...projectEvents, ...todoEvents]);
  }, [projects, todos]);

  return (
    <>
      {eventPopover && (
        <EditWorkCLD
          status={status}
          allowScroll={allowScroll}
          setEventPopover={setEventPopover}
          eventSelected={eventSelected}
          projects={projects}
          todos={todos}
        />
      )}
      <Calendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={calendarEvents}
        localizer={localizer}
        selectable
        popup={true}
        onSelectEvent={(eventOne) => handleEventPopover(eventOne)}
        components={{
          toolbar: RBCToolbar,
        }}
        messages={{
          showMore: function showMore(total) {
            return "+" + total + " 顯示全部";
          },
        }}
        style={{ height: "92vh", width: "100%" }}
      />
    </>
  );
};

export default CalendarMonth;
