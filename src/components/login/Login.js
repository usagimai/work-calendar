import { BigButtonDark } from "../reusable/ButtonCollection";
import { IconSelector } from "../reusable/IconSelector";

const Login = () => {
  return (
    <div className="login center">
      <div className="login-title">Work Calendar</div>
      <form>
        <div>
          <div className="id l-text">
            <div className="font-decoration-l"></div>
            <label htmlFor="username">帳號</label>
            <input type="text" id="username" required />
            <div className="hidden">
              <IconSelector name="unvisible" />
            </div>
          </div>
          <div className="pw l-text">
            <div className="font-decoration-l"></div>
            <label htmlFor="password">密碼</label>
            <input
              type="password"
              //   type={visible ? "text" : "password"}
              id="password"
              required
            />
            <div>
              {/* <div onClick={() => setVisible((prev) => !prev)}> */}
              <IconSelector name="unvisible" />
              {/* <IconSelector name={visible ? "visible" : "unvisible"} /> */}
            </div>
          </div>
          {/* <div className="error-message s-text">帳號/密碼錯誤訊息</div> */}
        </div>
        <div className="form-button">
          <BigButtonDark text="登入" />
        </div>
      </form>
    </div>
  );
};

export default Login;
