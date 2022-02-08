import {
  MediumButtonDark,
  MediumButtonLight,
} from "../reusable/ButtonCollection";
import EditProjectInfo from "./EditProjectInfo";
import ProjectDetailSchedule from "./ProjectDetailSchedule";

const NewProject = () => {
  return (
    <div className="edit-project">
      <EditProjectInfo title="建立新專案" />
      <ProjectDetailSchedule />
      <div className="buttons">
        <MediumButtonLight text="取消" />
        <MediumButtonDark text="儲存" />
      </div>
    </div>
  );
};

export default NewProject;
