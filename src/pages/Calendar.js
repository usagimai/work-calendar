import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import Weather from "../components/calendar/Weather";
import CalendarMonth from "../components/calendar/CalendarMonth";
import { app, auth } from "../firebase-config";

const Calendar = ({ status, setStatus }) => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    //驗證登入狀態，若未登入則轉導回首頁
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/", { replace: true });
      }
    });

    //設定操作status的「頁面資訊」
    setStatus({ ...status, page: "CLD" });
  }, []);

  //未登入狀態進入此頁面不顯示內容
  if (!user) return null;

  return (
    <div className="calendar">
      <Weather />
      <div className="hr-1"></div>
      <CalendarMonth status={status} setStatus={setStatus} />
    </div>
  );
};

export default Calendar;
