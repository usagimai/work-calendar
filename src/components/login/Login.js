import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import { BigButtonDark } from "../reusable/ButtonCollection";
import { IconSelector } from "../reusable/IconSelector";
import { app, auth } from "../../firebase-config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("./calendar", { replace: true }))
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            return setErrorMessage("帳號不存在");
          case "auth/wrong-password":
            return setErrorMessage("密碼錯誤");
          default:
            return setErrorMessage("帳號或密碼錯誤");
        }
      });
  };

  return (
    <div className="login center">
      <div className="login-title">Work Calendar</div>
      <form>
        <div>
          <div className="id l-text">
            <div className="font-decoration-l"></div>
            <label htmlFor="username">帳號</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="hidden">
              <IconSelector name="unvisible" />
            </div>
          </div>
          <div className="pw l-text">
            <div className="font-decoration-l"></div>
            <label htmlFor="password">密碼</label>
            <input
              type={visible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div onClick={() => setVisible((prev) => !prev)}>
              <IconSelector name={visible ? "visible" : "unvisible"} />
            </div>
          </div>
          <div className="error-message s-text">{errorMessage}</div>
        </div>
        <div className="form-button" onClick={handleLogin}>
          <BigButtonDark text="登入" />
        </div>
      </form>
    </div>
  );
};

export default Login;
