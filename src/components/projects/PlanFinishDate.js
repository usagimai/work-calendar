import { SelectCalendar } from "../reusable/EditGroup";
import EditWork from "../reusable/EditWork";

const PlanFinishDate = () => {
  return (
    <>
      {/* <EditWork title1="編輯工作細項" title2="工作細項完成 / 刪除" /> */}
      <div className="plan-finish-date">
        <div className="m-text red-color">2022/02/09</div>
        <div className="m-text">專案預定完成日</div>
        <SelectCalendar text="編輯" />
        <div className="s-text pointer">新增工作細項 ＋</div>
      </div>
    </>
  );
};

export default PlanFinishDate;
