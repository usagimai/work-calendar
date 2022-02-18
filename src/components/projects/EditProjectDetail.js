import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { doc, setDoc, updateDoc } from "firebase/firestore";

import {
  MediumButtonDark,
  MediumButtonLight,
} from "../reusable/ButtonCollection";
import AlertMessage from "../reusable/AlertMessage";
import EditProjectInfo from "./EditProjectInfo";
import ProjectDetailSchedule from "./ProjectDetailSchedule";
import EditProjectFinal from "./EditProjectFinal";
import { loadProjects } from "../../actions/projectsAction";
import { app, db, auth } from "../../firebase-config";

const EditProjectDetail = ({
  status,
  setStatus,
  projectSelected,
  setCreatePJClicked,
  setEditPJClicked,
  setIsCreateNewPJ,
  setProjectDeleted,
}) => {
  const projects = useSelector((state) => state.projects.all);
  const user = auth.currentUser;
  const dispatch = useDispatch();

  const [alertMessage, setAlertMessage] = useState(false);
  const [editCancel, setEditCancel] = useState(false);
  const [projectData, setProjectData] = useState();
  const [formValue, setFormValue] = useState({
    title: "",
    shortTitle: "",
    info: "",
    planFinishDate: "待設定",
    finishDate: "進行中",
    works: [],
  });

  const handleCancel = () => {
    //依據status決定資料cancel處理方式
    switch (status.project) {
      case "create":
        setFormValue({
          title: "",
          shortTitle: "",
          info: "",
          planFinishDate: "待設定",
          finishDate: "進行中",
          works: [],
        });
        break;
      case "edit":
        dispatch(loadProjects());
        setEditCancel(true);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    if (
      !formValue.title ||
      !formValue.shortTitle ||
      formValue.planFinishDate === "待設定"
    ) {
      setAlertMessage(true);
      return;
    } else {
      setAlertMessage(false);
    }

    //依據status決定資料submit處理方式
    switch (status.project) {
      case "create":
        const today = moment(new Date()).format("YYYYMMDD");
        const time = new Date().getTime();
        const todaySlash = moment(new Date()).format("YYYY/MM/DD");

        const handleCreateProject = () => {
          setIsCreateNewPJ(true);
          dispatch(loadProjects());
          setCreatePJClicked(false);
        };

        setDoc(doc(db, "projects", `${today}_${time}`), {
          email: user.email,
          createDate: todaySlash,
          createDateTime: `${today}${time}`,
          ...formValue,
        })
          .then(() => handleCreateProject())
          .catch((error) => {
            console.log("create project error");
          });
        break;

      case "edit":
        const handleEditProject = () => {
          dispatch(loadProjects());
          setEditPJClicked(false);
        };

        updateDoc(doc(db, "projects", projectSelected), {
          ...formValue,
        })
          .then(() => handleEditProject())
          .catch((error) => {
            console.log("edit project error");
          });

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setProjectData(
      projects.find((project) => {
        return project.id.match(new RegExp(projectSelected, "gi"));
      })
    );
  }, [projects, projectSelected]);

  useEffect(() => {
    sessionStorage.setItem("projectFormValue", JSON.stringify(formValue));
  }, [formValue]);

  //若session storage中有資料就讀入session storage中的資料
  // useEffect(() => {
  //   if (sessionStorage.getItem("projectFormValue") === "undefined") return;

  //   if (status.project === "edit") {
  //     setFormValue(JSON.parse(sessionStorage.getItem("projectFormValue")));
  //   }
  // }, []);

  return (
    <div className="edit-project">
      <EditProjectInfo
        status={status}
        projectData={projectData}
        formValue={formValue}
        setFormValue={setFormValue}
        editCancel={editCancel}
        setEditCancel={setEditCancel}
      />
      <ProjectDetailSchedule
        status={status}
        setStatus={setStatus}
        projectData={projectData}
        formValue={formValue}
        setFormValue={setFormValue}
        editCancel={editCancel}
        setEditCancel={setEditCancel}
      />
      {status.project === "edit" && (
        <EditProjectFinal
          status={status}
          projectData={projectData}
          formValue={formValue}
          setFormValue={setFormValue}
          editCancel={editCancel}
          setEditCancel={setEditCancel}
          setProjectDeleted={setProjectDeleted}
        />
      )}

      <div className="buttons">
        {alertMessage && <AlertMessage type="alert1" />}
        <div onClick={handleCancel}>
          <MediumButtonLight text="取消" />
        </div>
        <div onClick={handleSubmit}>
          <MediumButtonDark text="儲存" />
        </div>
      </div>
    </div>
  );
};

export default EditProjectDetail;
