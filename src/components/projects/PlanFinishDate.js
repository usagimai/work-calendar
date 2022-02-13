import { useState } from "react";

import { SelectCalendar } from "../reusable/EditGroup";
import EditWork from "../reusable/EditWork";
import useScrollBlock from "../../utils/useScrollBlock";

const PlanFinishDate = ({ projectData, status, setStatus }) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  const [pjEditWorkOpen, setPjEditWorkOpen] = useState(false);

  const handleCreatePJWork = () => {
    switch (status.page) {
      case "PJ":
        setPjEditWorkOpen(true);
        setStatus({ ...status, action: "create-pj-work" });
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
        />
      )}
      <div className="plan-finish-date">
        <div className="m-text red-color">{projectData.planFinishDate}</div>
        <div className="m-text">專案預定完成日</div>
        {status.action === "view-project" ? (
          <div></div>
        ) : (
          <SelectCalendar text="編輯" />
        )}
        <div className="s-text pointer" onClick={handleCreatePJWork}>
          新增工作細項 ＋
        </div>
      </div>
    </>
  );
};

export default PlanFinishDate;
