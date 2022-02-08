import PlanFinishDate from "./PlanFinishDate";
import ScheduleOne from "./ScheduleOne";
import NoSchedule from "./NoSchedule";

const ProjectDetailSchedule = () => {
  return (
    <div className="project-detail-schedule">
      <div className="font-decoration-long"></div>
      <div>
        <PlanFinishDate />
        <div className="schedule-group">
          <div className="schedule-title center s-text">完成期限</div>
          <div className="schedule-title center s-text">工作細項</div>
          <div className="schedule-title center s-text">執行日期</div>
          <div className="schedule-title center s-text">實際完成日</div>
          <div></div>
          <ScheduleOne />
          <ScheduleOne />
          <ScheduleOne />
        </div>
        {/* <NoSchedule /> */}
      </div>
    </div>
  );
};

export default ProjectDetailSchedule;
