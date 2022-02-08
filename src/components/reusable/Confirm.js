import Backdrop from "./Backdrop";
import { IconSelector } from "./IconSelector";
import { SmallButtonDark } from "./ButtonCollection";
import { SmallButtonLight } from "./ButtonCollection";

export const Confirm = ({ message1, message2 }) => {
  return (
    <Backdrop>
      <div className="white-container confirm-white-container">
        <div className="close-bg">
          <IconSelector name="close" />
        </div>
        <div className="confirm-content">
          <div className="m-text">{message1}</div>
          <div className="m-text">{message2}</div>
          <div className="confirm-button">
            <div className="pointer">
              <SmallButtonDark text="確認" />
            </div>
            <div className="pointer">
              <SmallButtonLight text="取消" />
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};
