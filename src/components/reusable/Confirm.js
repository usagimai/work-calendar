import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

import Backdrop from "./Backdrop";
import { IconSelector } from "./IconSelector";
import { SmallButtonDark } from "./ButtonCollection";
import { SmallButtonLight } from "./ButtonCollection";
import { loadProjects } from "../../actions/projectsAction";
import { loadTodos } from "../../actions/todosAction";
import { app, auth, db } from "../../firebase-config";

export const Confirm = ({
  message1,
  message2,
  confirmFor,
  confirmFor2,
  setLogoutBoxOpen,
  setDeleteWorkBoxOpen,
  setDeleteProjectBoxOpen,
  allowScroll,
  todo,
  setEditWorkBoxOpen,
  projectData,
  otherWorksArr,
  setFormValue,
  setProjectDeleted,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //確認登出相關
  const handleLogoutNavigate = () => {
    handleConfirmBoxClose();
    navigate("/", { replace: true });
  };

  //確認刪除project相關
  const handleDeleteProject = () => {
    dispatch(loadProjects());
    handleConfirmBoxClose();
    setProjectDeleted(true);
  };

  //確認刪除work相關 (重複可整理)
  const handleDeleteWork = () => {
    dispatch(loadProjects());
    handleConfirmBoxClose();
    setEditWorkBoxOpen(false);
  };

  //確認刪除todo相關 (重複可整理)
  const handleDeleteTodo = () => {
    dispatch(loadTodos());
    handleConfirmBoxClose();
    setEditWorkBoxOpen(false);
  };

  //通用
  const handleConfirmBoxClose = () => {
    switch (confirmFor) {
      case "logout":
        setLogoutBoxOpen(false);
        break;
      case "deleteWork":
      case "deleteTodo":
        setDeleteWorkBoxOpen(false);
        break;
      case "deleteProject":
        setDeleteProjectBoxOpen(false);
        break;
      default:
        console.log("confirmBoxClose error");
    }
    allowScroll();
  };

  const handleConfirmFor = () => {
    switch (confirmFor) {
      case "logout":
        signOut(auth)
          .then(() => handleLogoutNavigate())
          .catch((error) => {
            console.log("logout error");
          });
        break;
      case "deleteProject":
        deleteDoc(doc(db, "projects", projectData.id))
          .then(() => handleDeleteProject())
          .catch((error) => {
            console.log("delete project error");
          });

        break;
      case "deleteWork":
        if (confirmFor2 !== "deleteWorkSession") {
          //在「閱覽專案」的頁面，刪除工作細項直接反應至firestore
          updateDoc(doc(db, "projects", projectData.id), {
            works: otherWorksArr,
          })
            .then(() => handleDeleteWork())
            .catch((error) => {
              console.log("delete work error");
            });
        } else {
          //在「建立新專案」及「編輯既有專案」的頁面，刪除工作細項僅先更新於session storage
          setFormValue((prevValue) => {
            return {
              ...prevValue,
              works: otherWorksArr,
            };
          });
          handleConfirmBoxClose();
        }

        break;
      case "deleteTodo":
        deleteDoc(doc(db, "todos", todo.id))
          .then(() => handleDeleteTodo())
          .catch((error) => {
            console.log("delete todo error");
          });
        break;
      default:
        console.log("confirmFor error");
    }
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
