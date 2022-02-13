import { useState } from "react";
// import DatePicker from "react-datepicker";

import { EditPen } from "../reusable/EditGroup";
import EditWork from "../reusable/EditWork";
import useScrollBlock from "../../utils/useScrollBlock";
// import "react-datepicker/dist/react-datepicker.css";

const ScheduleOne = ({ work, projectData, status, setStatus }) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  const [pjEditWorkOpen, setPjEditWorkOpen] = useState(false);
  // const [datePickerOpen, setDatePickerOpen] = useState(false);
  // const [startDate, setStartDate] = useState(new Date());

  const handleEditPJWork = () => {
    switch (status.page) {
      case "PJ":
        setPjEditWorkOpen(true);
        setStatus({ ...status, action: "edit-pj-work" });
        blockScroll();
        break;
      default:
        break;
    }
  };

  return (
    <>
      {pjEditWorkOpen && (
        <EditWork
          status={status}
          setStatus={setStatus}
          allowScroll={allowScroll}
          setPjEditWorkOpen={setPjEditWorkOpen}
          projectData={projectData}
          work={work}
        />
      )}
      {/* {datePickerOpen && (
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      )} */}

      <div className="m-text center">{work.deadline}</div>
      <div className="m-text">{work.content}</div>
      <div
        className="m-text center edit-color pointer"
        // onClick={() => setDatePickerOpen(true)}
      >
        檢視月曆
      </div>
      <div className="m-text center">{work.finishDate}</div>
      <div onClick={handleEditPJWork}>
        <EditPen text="編輯" />
      </div>
    </>
  );
};

export default ScheduleOne;
