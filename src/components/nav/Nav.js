import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { Confirm } from "../reusable/Confirm";
import useScrollBlock from "../../utils/useScrollBlock";
import { app, auth } from "../../firebase-config";

const Nav = () => {
  const [blockScroll, allowScroll] = useScrollBlock();
  const [logoutBoxOpen, setLogoutBoxOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [menu, setMenu] = useState();

  const { pathname } = useLocation();
  const path = pathname.split("/")[1];

  const handleLogoutBoxOpen = () => {
    setLogoutBoxOpen(true);
    blockScroll();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
  }, []);

  useEffect(() => {
    // [檢視行事曆, 專案, 其他]
    switch (path) {
      case "calendar":
        setMenu([true, false, false]);
        break;
      case "projects":
      case "create-project":
      case "edit-project":
        setMenu([false, true, false]);
        break;
      case "todos":
        setMenu([false, false, true]);
        break;
    }
  }, [path]);

  //未登入時不顯示Nav
  if (!visible) return null;

  return (
    <>
      {logoutBoxOpen && (
        <Confirm
          message1="是否確認登出?"
          confirmFor="logout"
          setLogoutBoxOpen={setLogoutBoxOpen}
          allowScroll={allowScroll}
        />
      )}

      <div className="nav">
        <div className="nav-content">
          <div className="nav-title">Work Calendar</div>
          <div className="menu">
            <div
              className={`m-text pointer ${
                menu[0] ? "calendar-active" : "calendar-inactive"
              }`}
            >
              <Link to="/calendar">檢視行事曆</Link>
            </div>
            <div className="work-manage">
              <div className="m-text">工作管理</div>
              <div
                className={`m-text pointer ${
                  menu[1] ? "work-active" : "work-inactive"
                }`}
              >
                <Link to="/projects">專案</Link>
              </div>
              <div
                className={`m-text pointer ${
                  menu[2] ? "work-active" : "work-inactive"
                }`}
              >
                <Link to="todos">其他</Link>
              </div>
            </div>
          </div>
          <div className="logout">
            <div></div>
            <div className="m-text pointer" onClick={handleLogoutBoxOpen}>
              登出
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
