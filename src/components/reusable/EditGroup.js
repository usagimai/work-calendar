import { IconSelector } from "./IconSelector";

export const EditPen = ({ text }) => {
  return (
    <div className="edit-group s-text pointer">
      <div>{text}</div>
      <IconSelector name="edit" />
    </div>
  );
};

export const SelectCalendar = ({ text }) => {
  return (
    <div className="edit-group s-text pointer">
      <div>{text}</div>
      <IconSelector name="calendar-icon" />
    </div>
  );
};
