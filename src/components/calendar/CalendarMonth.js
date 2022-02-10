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
  },
  {
    title: "Big Meeting2",
    start: moment("2022-02-02").toDate(),
    end: moment("2022-02-02").toDate(),
  },
  {
    title: "Big Meeting3",
    start: moment("2022-02-02").toDate(),
    end: moment("2022-02-02").toDate(),
  },
  {
    title: "Big Meeting4",
    start: moment("2022-02-02").toDate(),
    end: moment("2022-02-02").toDate(),
  },
  {
    title: "Big Meeting5",
    start: moment("2022-02-02").toDate(),
    end: moment("2022-02-02").toDate(),
  },
  {
    title: "Big Meeting6",
    start: moment("2022-02-02").toDate(),
    end: moment("2022-02-02").toDate(),
  },
  {
    title: "Vacation",
    start: moment("2022-02-10").toDate(),
    end: moment("2022-02-12").toDate(),
  },
  {
    title: "Conference",
    start: moment("2022-02-20").toDate(),
    end: moment("2022-02-24").toDate(),
  },
];

const CalendarMonth = () => {
  const [blockScroll, allowScroll] = useScrollBlock();
  //到時候資料用redux或context處理
  const [customEventList, setEvents] = useState(events);
  const [eventPopover, setEventPopover] = useState(false);

  const handleEventPopover = () => {
    setEventPopover(true);
    blockScroll();
  };

  return (
    <>
      {eventPopover && (
        <EditWork
          title1="編輯工作細項"
          title2="工作細項完成 / 刪除"
          setEventPopover={setEventPopover}
          allowScroll={allowScroll}
        />
      )}
      <Calendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={customEventList}
        localizer={localizer}
        selectable
        popup={true}
        onSelectEvent={handleEventPopover}
        components={{
          toolbar: RBCToolbar,
          // event: EventPopover,
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
