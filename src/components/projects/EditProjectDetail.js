import {
  MediumButtonDark,
  MediumButtonLight,
} from "../reusable/ButtonCollection";
import AlertMessage from "../reusable/AlertMessage";
import EditProjectInfo from "./EditProjectInfo";
import ProjectDetailSchedule from "./ProjectDetailSchedule";
import EditProjectFinal from "./EditProjectFinal";

const EditProjectDetail = ({ title }) => {
  return (
    <div className="edit-project">
      <EditProjectInfo title={title} />
      <ProjectDetailSchedule />
      <EditProjectFinal />
      <div className="buttons">
        {/* <AlertMessage type="alert1" /> */}
        <MediumButtonLight text="取消" />
        <MediumButtonDark text="儲存" />
      </div>
    </div>
  );
};

export default EditProjectDetail;
