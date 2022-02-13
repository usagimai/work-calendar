import { useState } from "react";
import moment from "moment";
import moment_timezone from "moment-timezone";
import { Calendar, momentLocalizer } from "react-big-calendar";

import EditWork from "../reusable/EditWork";
import useScrollBlock from "../../utils/useScrollBlock";
import RBCToolbar from "./CalendarToolbar";
import "moment/locale/zh-tw";

const localizer = momentLocalizer(moment_timezone);

const events = [
  {
    title: "Big Meeting",
    start: moment("2022-02-02").toDate(),
    end: moment("2022-02-02").toDate(),
    resource: ["todos", "20220210_1728"],
  },
  {
    title: "Big Meeting2",
    start: moment("2022-02-02").toDate(),
    end: moment("2022-02-02").toDate(),
    resource: ["todos", "20220210_1729"],
  },
  {
    title: "Big Meeting3",
    start: moment("2022-02-02").toDate(),
    end: moment("2022-02-02").toDate(),
    resource: ["todos", "20220210_1730"],
  },
  {
    title: "Big Meeting4",
    start: moment("2022-02-02").toDate(),
    end: moment("2022-02-02").toDate(),
    resource: ["todos", "20220210_1731"],
  },
  {
    title: "Big Meeting5",
    start: moment("2022-02-02").toDate(),
    end: moment("2022-02-02").toDate(),
    resource: ["todos", "20220210_1732"],
  },
  {
    title: "Big Meeting6",
    start: moment("2022-02-02").toDate(),
    end: moment("2022-02-02").toDate(),
    resource: ["todos", "20220210_1733"],
  },
  {
    title: "Vacation",
    start: moment("2022-02-10").toDate(),
    end: moment("2022-02-12").toDate(),
    resource: ["todos", "20220210_1734"],
  },
  {
    title: "Conference",
    start: moment("2022-02-20").toDate(),
    end: moment("2022-02-24").toDate(),
    resource: ["todos", "20220210_1735"],
  },
];

const CalendarMonth = ({ status, setStatus }) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  //到時候資料用redux或context處理
  const [customEventList, setEvents] = useState(events);
  const [eventPopover, setEventPopover] = useState(false);
  const [eventSelected, setEventSelected] = useState();

  const handleEventPopover = (eventOne) => {
    setEventPopover(true);
    setEventSelected(eventOne);
    blockScroll();
  };

  return (
    <>
      {eventPopover && (
        <EditWork
          //待寫規則設定status的action為「edit-pj-work」或「edit-td-work」
          setEventPopover={setEventPopover}
          allowScroll={allowScroll}
          eventSelected={eventSelected}
        />
      )}
      <Calendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={customEventList}
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
