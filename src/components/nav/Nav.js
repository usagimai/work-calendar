import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { Confirm } from "../reusable/Confirm";
import useScrollBlock from "../../utils/useScrollBlock";
import { app, auth } from "../../firebase-config";

const Nav = () => {
  const [blockScroll, allowScroll] = useScrollBlock();
  const [logoutBoxOpen, setLogoutBoxOpen] = useState(false);
  const [visible, setVisible] = useState(false);

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
            <div className="m-text pointer calendar-active">
              <Link to="/calendar">檢視行事曆</Link>
            </div>
            <div className="work-manage">
              <div className="m-text">工作管理</div>
              <div className="m-text pointer work-inactive">
                <Link to="/project">專案</Link>
              </div>
              <div className="m-text pointer work-inactive">
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
