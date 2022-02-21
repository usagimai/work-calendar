import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { doc, setDoc, updateDoc } from "firebase/firestore";

//reusable components
import {
  MediumButtonDark,
  MediumButtonLight,
} from "../reusable/ButtonCollection";
import AlertMessage from "../reusable/AlertMessage";
//components
import EditProjectInfo from "./EditProjectInfo";
import ProjectDetailSchedule from "./ProjectDetailSchedule";
import EditProjectFinal from "./EditProjectFinal";
//others
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
  const [blankAlert, setBlankAlert] = useState({
    title: false,
    shortTitle: false,
    planFinishDate: false,
  });
  const [isWorkBoxOpen, setIsWorkBoxOpen] = useState(false);
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
    //若有必填欄位未填，顯示提醒訊息 & 該欄位以紅色提示
    if (!formValue.title) {
      setBlankAlert((prevValue) => {
        return {
          ...prevValue,
          title: true,
        };
      });
    } else {
      setBlankAlert((prevValue) => {
        return {
          ...prevValue,
          title: false,
        };
      });
    }

    if (!formValue.shortTitle) {
      setBlankAlert((prevValue) => {
        return {
          ...prevValue,
          shortTitle: true,
        };
      });
    } else {
      setBlankAlert((prevValue) => {
        return {
          ...prevValue,
          shortTitle: false,
        };
      });
    }

    if (formValue.planFinishDate === "待設定") {
      setBlankAlert((prevValue) => {
        return {
          ...prevValue,
          planFinishDate: true,
        };
      });
    } else {
      setBlankAlert((prevValue) => {
        return {
          ...prevValue,
          planFinishDate: false,
        };
      });
    }

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
          setEditPJClicked(false);
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

  return (
    <div className="edit-project">
      <EditProjectInfo
        status={status}
        projectData={projectData}
        formValue={formValue}
        setFormValue={setFormValue}
        editCancel={editCancel}
        setEditCancel={setEditCancel}
        isWorkBoxOpen={isWorkBoxOpen}
        blankAlert={blankAlert}
      />
      <ProjectDetailSchedule
        status={status}
        setStatus={setStatus}
        projectData={projectData}
        formValue={formValue}
        setFormValue={setFormValue}
        editCancel={editCancel}
        setEditCancel={setEditCancel}
        isWorkBoxOpen={isWorkBoxOpen}
        setIsWorkBoxOpen={setIsWorkBoxOpen}
        blankAlert={blankAlert}
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
          isWorkBoxOpen={isWorkBoxOpen}
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
