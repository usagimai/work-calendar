import { useEffect } from "react";

import PlanFinishDate from "./PlanFinishDate";
import ScheduleOne from "./ScheduleOne";
import NoSchedule from "./NoSchedule";

const ProjectDetailSchedule = ({
  projectData,
  status,
  setStatus,
  formValue,
  setFormValue,
  editCancel,
  setEditCancel,
}) => {
  useEffect(() => {
    if (!projectData || !status) return;

    if (status.project === "edit") {
      if (editCancel) {
        setFormValue((prevValue) => {
          return {
            ...prevValue,
            works: projectData.works,
          };
        });
        setEditCancel(false);
      } else {
        //陣列無法直接比較，應修改判斷「新增工作細項」或「編輯」是是否點開
        if (
          formValue.works.length !== 0 &&
          formValue.works.length !== projectData.works.length
        ) {
          return;
        } else {
          setFormValue((prevValue) => {
            return {
              ...prevValue,
              works: projectData.works,
            };
          });
        }
      }
    }
  }, [projectData, status]);

  return (
    <>
      {status && (
        <div className="project-detail-schedule">
          <div className="font-decoration-long"></div>
          <div>
            <PlanFinishDate
              projectData={projectData}
              status={status}
              setStatus={setStatus}
              formValue={formValue}
              setFormValue={setFormValue}
              editCancel={editCancel}
              setEditCancel={setEditCancel}
            />
            <div className="schedule-group">
              <div className="schedule-title center s-text">完成期限</div>
              <div className="schedule-title center s-text">工作細項</div>
              <div className="schedule-title center s-text">執行日期</div>
              <div className="schedule-title center s-text">實際完成日</div>
              <div></div>
              {status.project === "view" &&
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
              {status.project !== "view" &&
                formValue.works.length > 0 &&
                formValue.works.map((work) => (
                  <ScheduleOne
                    key={work.id}
                    work={work}
                    projectData={formValue}
                    status={status}
                    setStatus={setStatus}
                    formValue={formValue}
                    setFormValue={setFormValue}
                    editCancel={editCancel}
                    setEditCancel={setEditCancel}
                  />
                ))}
            </div>
            {status.project !== "view" ? (
              formValue.works.length > 0 ? null : (
                <NoSchedule />
              )
            ) : projectData && projectData.works.length === 0 ? (
              <NoSchedule />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetailSchedule;
