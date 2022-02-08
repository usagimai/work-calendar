import { useRef, useState, useEffect } from "react";

import { IconSelector } from "../reusable/IconSelector";
import EditWork from "../reusable/EditWork";
import EmptyMessage from "../reusable/EmptyMessage";
import TodoListOne from "./TodoListOne";

const TodoList = () => {
  const createInfoRef = useRef();
  const [overCreate, setOverCreate] = useState(false);

  //取得滑鼠座標，定位說明文字
  useEffect(() => {
    const handleCursorPosition = (e) => {
      createInfoRef.current.style.top = e.pageY + 24 + "px";
      createInfoRef.current.style.left = e.pageX + -46 + "px";
    };

    window.addEventListener("mousemove", handleCursorPosition, {
      passive: true,
    });
    return () => window.removeEventListener("mousemove", handleCursorPosition);
  }, []);

  return (
    <>
      {/* <EditWork title="新增待辦事項" /> */}
      <div className="todo-list">
        <div className="todo-list-title">
          <div className="l-text center">其他待辦事項一覽</div>
          <div
            className="pointer"
            onMouseEnter={() => {
              setOverCreate(true);
            }}
            onMouseLeave={() => {
              setOverCreate(false);
            }}
          >
            <IconSelector name="create" />
          </div>
        </div>

        {/* 依有無待辦事項決定顯示的內容-1 */}
        {/* <div className="todo-detail-schedule">
          <div className="font-decoration-long"></div>
          <div className="schedule-group">
            <div className="schedule-title center s-text">完成期限</div>
            <div className="schedule-title center s-text">待辦事項</div>
            <div className="schedule-title center s-text">執行日期</div>
            <div className="schedule-title center s-text">實際完成日</div>
            <div></div>
            <TodoListOne />
            <TodoListOne />
            <TodoListOne />
          </div>
        </div> */}
        {/* 依有無待辦事項決定顯示的內容-2 */}
        <EmptyMessage
          message1="查無待辦事項"
          message2="如欲新增，請透過右上方圖示進行"
        />

        <div
          className={`xs-text center ${
            overCreate ? "create-info" : "create-info-hidden"
          }`}
          ref={createInfoRef}
        >
          建立待辦事項
        </div>
      </div>
    </>
  );
};

export default TodoList;
