import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import Backdrop from "./Backdrop";
import { IconSelector } from "./IconSelector";
import { SmallButtonDark } from "./ButtonCollection";
import { SmallButtonLight } from "./ButtonCollection";
import { app, auth } from "../../firebase-config";

export const Confirm = ({
  message1,
  message2,
  confirmFor,
  setLogoutBoxOpen,
  allowScroll,
  blockScroll,
}) => {
  const navigate = useNavigate();

  //通用
  const handleConfirmFor = () => {
    switch (confirmFor) {
      case "logout":
        signOut(auth)
          .then(() => handleLogoutNavigate())
          .catch((error) => {
            console.log("logout error");
          });
        break;
      // case "deleteItem":
      //   const keyToDelete = `${id}_${type}`;
      //   const { [keyToDelete]: value, ...editedCartItems } = cartItems;
      //   localStorage.setItem("machudaysCart", JSON.stringify(editedCartItems));
      //   setCartItemChange(true);
      //   handleConfirmBoxClose();
      //   break;
      // case "deleteFavorites":
      //   handleRemoveFavorite2(dispatch, favorites, user, idFav);
      //   handleConfirmBoxClose();
      //   break;
      default:
        console.log("confirmFor error");
    }
  };

  const handleConfirmBoxClose = () => {
    switch (confirmFor) {
      case "logout":
        setLogoutBoxOpen(false);
        break;
      // case "deleteItem":
      //   setDeleteBoxOpen(false);
      //   break;
      // case "deleteFavorites":
      //   setDeleteFavBoxOpen(false);
      //   break;
      default:
        console.log("confirmBoxClose error");
    }
    allowScroll();
  };

  //確認登出相關
  const handleLogoutNavigate = () => {
    handleConfirmBoxClose();
    navigate("/", { replace: true });
    blockScroll();
  };

  return (
    <Backdrop>
      <div className="white-container confirm-white-container">
        <div className="close-bg" onClick={handleConfirmBoxClose}>
          <IconSelector name="close" />
        </div>
        <div className="confirm-content">
          <div className="m-text">{message1}</div>
          <div className="m-text">{message2}</div>
          <div className="confirm-button">
            <div className="pointer" onClick={handleConfirmFor}>
              <SmallButtonDark text="確認" />
            </div>
            <div className="pointer" onClick={handleConfirmBoxClose}>
              <SmallButtonLight text="取消" />
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};
