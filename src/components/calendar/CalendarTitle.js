import { IconSelector } from "../reusable/IconSelector";

const CalendarTitle = () => {
  return (
    <div className="calendar-title">
      <div className="arrow-icon pointer">
        <IconSelector name="circle-arrow-left" />
      </div>
      <div className="calendar-month center">2022年2月</div>
      <div className="arrow-icon pointer">
        <IconSelector name="circle-arrow-right" />
      </div>
    </div>
  );
};

export default CalendarTitle;
