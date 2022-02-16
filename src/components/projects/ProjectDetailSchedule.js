import { useState } from "react";

import PlanFinishDate from "./PlanFinishDate";
import ScheduleOne from "./ScheduleOne";
import NoSchedule from "./NoSchedule";

const ProjectDetailSchedule = ({ projectData, status, setStatus }) => {
  const [planFinishDateValue, setPlanFinishDateValue] = useState();

  return (
    <div className="project-detail-schedule">
      <div className="font-decoration-long"></div>
      <div>
        <PlanFinishDate
          projectData={projectData}
          status={status}
          setStatus={setStatus}
          planFinishDateValue={planFinishDateValue}
          setPlanFinishDateValue={setPlanFinishDateValue}
        />
        <div className="schedule-group">
          <div className="schedule-title center s-text">完成期限</div>
          <div className="schedule-title center s-text">工作細項</div>
          <div className="schedule-title center s-text">執行日期</div>
          <div className="schedule-title center s-text">實際完成日</div>
          <div></div>
          {status.project !== "create" &&
            projectData &&
            projectData.works[0] &&
            projectData.works.map((work) => (
              <ScheduleOne
                key={work.id}
                work={work}
                projectData={projectData}
                status={status}
                setStatus={setStatus}
              />
            ))}
        </div>
        {status.project === "create" ? (
          <NoSchedule />
        ) : projectData && projectData.works.length === 0 ? (
          <NoSchedule />
        ) : null}
      </div>
    </div>
  );
};

export default ProjectDetailSchedule;
