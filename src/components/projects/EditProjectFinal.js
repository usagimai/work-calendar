import { DecorationTitle } from "../reusable/DecorationTitle";
import { SelectCalendar } from "../reusable/EditGroup";
import { IconSelector } from "../reusable/IconSelector";
import { Confirm } from "../reusable/Confirm";

const EditProjectFinal = () => {
  return (
    <>
      {/* <Confirm message1="專案刪除後無法復原，" message2="是否確認刪除?" /> */}
      <div className="edit-project-final">
        <DecorationTitle title="專案完成 / 刪除" fontSize="l" />
        <div>
          <div className="m-text">專案實際完成日</div>
          <SelectCalendar text="選擇" />
          <div className="m-text">刪除專案</div>
          <div className="pointer">
            <IconSelector name="delete" />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProjectFinal;
