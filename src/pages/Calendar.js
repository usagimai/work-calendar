import Weather from "../components/calendar/Weather";
import CalendarMonth from "../components/calendar/CalendarMonth";

const Calendar = () => {
  return (
    <div className="calendar">
      <Weather />
      <div className="hr-1"></div>
      <CalendarMonth />
    </div>
  );
};

export default Calendar;
