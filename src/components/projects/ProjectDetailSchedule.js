import { useEffect, useState } from "react";

import PlanFinishDate from "./PlanFinishDate";
import ScheduleOne from "./ScheduleOne";
import NoSchedule from "./NoSchedule";
import { sortWork } from "../../utils/sortUtils";
import { sortWorkForm } from "../../utils/sortUtils";

const ProjectDetailSchedule = ({
  projectData,
  status,
  setStatus,
  formValue,
  setFormValue,
  editCancel,
  setEditCancel,
  isWorkBoxOpen,
  setIsWorkBoxOpen,
  blankAlert,
}) => {
  const [sortedWorks, setSortedWorks] = useState();
  const [sortedWorksForm, setSortedWorksForm] = useState();

  //依據status呈現不同內容
  useEffect(() => {
    if (!projectData || !status) return;

    switch (status.project) {
      case "view":
        //工作細項排序 (完成期限遠→近)
        sortWork(projectData);
        setSortedWorks(projectData.works);
        break;

      case "create":
        //點開「新增工作細項」或「編輯工作細項」的狀況 (不變動formValue的資料)
        if (isWorkBoxOpen) {
          return;
        } else {
          //初次進入的狀況 (載入預設值)
          setFormValue((prevValue) => {
            return {
              ...prevValue,
              works: [],
            };
          });
        }
        break;

      case "edit":
        //點選取消的狀況 (恢復資料庫中的資料)
        if (editCancel) {
          setFormValue((prevValue) => {
            return {
              ...prevValue,
              works: projectData.works,
            };
          });
          setEditCancel(false);
        } else {
          //點開「新增工作細項」或「編輯工作細項」的狀況 (不變動formValue的資料)
          if (isWorkBoxOpen) {
            return;
          } else {
            //初次進入的狀況 (載入資料庫中的資料)
            setFormValue((prevValue) => {
              return {
                ...prevValue,
                works: projectData.works,
              };
            });
          }
        }
        break;

      default:
        break;
    }
  }, [projectData, status]);

  useEffect(() => {
    switch (status.project) {
      case "create":
      case "edit":
        //工作細項排序 (完成期限遠→近)
        sortWorkForm(formValue);
        setSortedWorksForm(formValue.works);
        break;

      default:
        break;
    }
  }, [formValue]);

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
              isWorkBoxOpen={isWorkBoxOpen}
              setIsWorkBoxOpen={setIsWorkBoxOpen}
              blankAlert={blankAlert}
            />
            <div className="schedule-group">
              <div className="schedule-title center s-text first-column">
                完成期限
              </div>
              <div className="schedule-title center s-text">工作細項</div>
              <div className="schedule-title center s-text">執行日期</div>
              <div className="schedule-title center s-text">實際完成日</div>
              <div className="schedule-title last-column"></div>
              {status.project === "view" &&
                sortedWorks &&
                sortedWorks.map((work) => (
                  <ScheduleOne
                    key={work.id}
                    work={work}
                    projectData={projectData}
                    status={status}
                    setStatus={setStatus}
                  />
                ))}
              {status.project !== "view" &&
                sortedWorksForm &&
                sortedWorksForm.length > 0 &&
                sortedWorksForm.map((work) => (
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
                    isWorkBoxOpen={isWorkBoxOpen}
                    setIsWorkBoxOpen={setIsWorkBoxOpen}
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
