import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  MediumButtonDark,
  MediumButtonLight,
} from "../reusable/ButtonCollection";
import AlertMessage from "../reusable/AlertMessage";
import EditProjectInfo from "./EditProjectInfo";
import ProjectDetailSchedule from "./ProjectDetailSchedule";
import EditProjectFinal from "./EditProjectFinal";

const EditProjectDetail = ({ status, setStatus, projectSelected }) => {
  const projects = useSelector((state) => state.projects.all);

  const [projectData, setProjectData] = useState();

  useEffect(() => {
    setProjectData(
      projects.find((project) => {
        return project.id.match(new RegExp(projectSelected, "gi"));
      })
    );
  }, [projects, projectSelected]);

  return (
    <div className="edit-project">
      <EditProjectInfo status={status} projectData={projectData} />
      <ProjectDetailSchedule
        status={status}
        setStatus={setStatus}
        projectData={projectData}
      />
      {status.project === "edit" && (
        <EditProjectFinal status={status} projectData={projectData} />
      )}

      <div className="buttons">
        {/* <AlertMessage type="alert1" /> */}
        <MediumButtonLight text="取消" />
        <MediumButtonDark text="儲存" />
      </div>
    </div>
  );
};

export default EditProjectDetail;
