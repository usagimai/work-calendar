import { Confirm } from "../reusable/Confirm";

const Nav = () => {
  return (
    <>
      {/* <Confirm message1="是否確認登出?" /> */}
      <div className="nav">
        <div className="nav-content">
          <div className="nav-title">Work Calendar</div>
          <div className="menu">
            <div className="m-text pointer calendar-active">檢視行事曆</div>
            <div className="work-manage">
              <div className="m-text">工作管理</div>
              <div className="m-text pointer work-inactive">專案</div>
              <div className="m-text pointer work-inactive">其他</div>
            </div>
          </div>
          <div className="logout">
            <div></div>
            <div className="m-text pointer">登出</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
