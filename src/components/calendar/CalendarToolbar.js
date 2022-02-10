import moment from "moment";

import { IconSelector } from "../reusable/IconSelector";

function RBCToolbar(props) {
  const getCustomToolbar = () => {
    const date = moment(props.date);
    const month = date.format("M");
    const year = date.format("YYYY");

    const goToBack = () => {
      let mDate = props.date;
      let newDate = new Date(mDate.getFullYear(), mDate.getMonth() - 1, 1);
      props.onNavigate("prev", newDate);
    };
    const goToNext = () => {
      let mDate = props.date;
      let newDate = new Date(mDate.getFullYear(), mDate.getMonth() + 1, 1);
      props.onNavigate("next", newDate);
    };

    return (
      <div className="calendar-title">
        <div className="arrow-icon pointer" onClick={goToBack}>
          <IconSelector name="circle-arrow-left" />
        </div>
        <div className="calendar-month center">
          {year}年{month}月
        </div>
        <div className="arrow-icon pointer" onClick={goToNext}>
          <IconSelector name="circle-arrow-right" />
        </div>
      </div>
    );
  };

  return <>{getCustomToolbar()}</>;
}

export default RBCToolbar;
