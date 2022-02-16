import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import moment from "moment";

import { DecorationTitle } from "../reusable/DecorationTitle";
import { SelectCalendar } from "../reusable/EditGroup";
import { IconSelector } from "../reusable/IconSelector";
import { Confirm } from "../reusable/Confirm";

const EditProjectFinal = ({ status, projectData }) => {
  const [finishDateValue, setFinishDateValue] = useState();

  const handlePFinishDateChange = (value) => {
    setFinishDateValue(moment(value.toDate()).format("YYYY/MM/DD"));
  };

  //依據status呈現不同內容
  useEffect(() => {
    if (!projectData) return;

    switch (status.project) {
      case "create":
        setFinishDateValue("進行中");
        break;
      case "edit":
        setFinishDateValue(projectData.finishDate);
        break;
      default:
        break;
    }
  }, [projectData, status]);

  return (
    <>
      {/* <Confirm message1="專案刪除後無法復原，" message2="是否確認刪除?" />  */}
      <div className="edit-project-final">
        <DecorationTitle title="專案完成 / 刪除" fontSize="l" />
        <div>
          <div className="m-text">專案實際完成日</div>
          <div>
            {finishDateValue !== "進行中" && (
              <div className="m-text">{finishDateValue}</div>
            )}
            {finishDateValue === "進行中" ? (
              <DatePicker
                value={finishDateValue}
                onChange={handlePFinishDateChange}
                className="teal"
                render={(value, openCalendar) => {
                  return (
                    <div onClick={openCalendar}>
                      <SelectCalendar text="選擇" />
                    </div>
                  );
                }}
              />
            ) : (
              <DatePicker
                value={finishDateValue}
                onChange={handlePFinishDateChange}
                className="teal"
                render={(value, openCalendar) => {
                  return (
                    <div onClick={openCalendar}>
                      <SelectCalendar text="編輯" />
                    </div>
                  );
                }}
              />
            )}
          </div>

          <div className="m-text">刪除專案</div>
          <div className="pointer">
            <IconSelector name="delete" />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProjectFinal;
