import Backdrop from "./Backdrop";
import { IconSelector } from "./IconSelector";
import { DecorationTitle } from "./DecorationTitle";
import { SelectCalendar } from "./EditGroup";
import { SmallButtonDark } from "./ButtonCollection";
import AlertMessage from "./AlertMessage";
import { formData } from "../../data";

const EditWork = ({ title1, title2 }) => {
  return (
    <Backdrop>
      <div className="white-container create-white-container">
        <div className="close-bg">
          <IconSelector name="close" />
        </div>

        <div className="create-content">
          <DecorationTitle title={title1} fontSize="m" />
          <div className="edit-work-info">
            <div className="m-text">完成期限</div>
            {/* 兩種狀態 */}
            {/* <SelectCalendar text="選擇" /> */}
            <div>
              <div className="m-text">2022/02/09</div>
              <SelectCalendar text="編輯" />
            </div>

            <div className="m-text">執行日期</div>
            {/* 兩種狀態 */}
            {/* <SelectCalendar text="選擇" /> */}
            <SelectCalendar text="檢視/編輯" />

            <div className="m-text">執行內容</div>
            <input type="text" maxLength="30" className="s-text" />
            <div></div>
            <div className="xs-text gray-color limit">{formData.limit30}</div>
            <div className="m-text">
              其他說明
              <br />
              <span className="xs-text gray-color">
                {formData.notNecessary}
              </span>
            </div>
            <textarea maxLength="100" className="s-text"></textarea>
            <div></div>
            <div className="xs-text gray-color limit">{formData.limit100}</div>
          </div>

          <DecorationTitle title={title2} fontSize="m" />
          <div className="edit-work-final">
            <div className="m-text">實際完成日</div>
            {/* 兩種狀態 */}
            {/* <SelectCalendar text="選擇" /> */}
            <div>
              <div className="m-text">2022/02/09</div>
              <SelectCalendar text="編輯" />
            </div>

            <div className="m-text">刪除工作細項</div>
            <div className="pointer">
              <IconSelector name="delete" />
            </div>
          </div>
        </div>

        <div>
          {/* <AlertMessage type="alert2" /> */}
          <SmallButtonDark text="儲存" />
        </div>
      </div>
    </Backdrop>
  );
};

export default EditWork;
