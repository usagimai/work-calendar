import { EditPen } from "../reusable/EditGroup";

const ScheduleOne = () => {
  return (
    <>
      <div className="m-text center">2022/02/03</div>
      <div className="m-text">工作細項</div>
      <div className="m-text center edit-color pointer">檢視月曆</div>
      <div className="m-text center">未完成</div>
      <EditPen text="編輯" />
    </>
  );
};

export default ScheduleOne;
