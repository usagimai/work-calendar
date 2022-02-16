import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { IconSelector } from "../reusable/IconSelector";
import EditWork from "../reusable/EditWork";
import EmptyMessage from "../reusable/EmptyMessage";
import TodoListOne from "./TodoListOne";
import useScrollBlock from "../../utils/useScrollBlock";

const TodoList = ({ findMethod, status, setStatus }) => {
  const createInfoRef = useRef();
  const todos = useSelector((state) => state.todos.all);

  const [blockScroll, allowScroll] = useScrollBlock();
  const [overCreate, setOverCreate] = useState(false);
  const [todoList, setTodoList] = useState();
  const [tdEditWorkOpen, setTdEditWorkOpen] = useState(false);

  const handleCreateWork = () => {
    setTdEditWorkOpen(true);
    setStatus({ ...status, work: "create-td" });
    blockScroll();
  };

  //篩選、排序、搜尋功能
  useEffect(() => {
    const filteredList = todos.filter((todo) => {
      switch (findMethod.filter) {
        case "未完成":
          return todo.finishDate.match(new RegExp("未完成", "gi"));
        case "已完成":
          return todo.finishDate.indexOf("未完成") === -1;
        case "全部":
          return todo;
        default:
          break;
      }
    });
    const sortedList = filteredList.sort((a, b) => {
      switch (findMethod.sort) {
        case "CDNO":
          return b.createDateTime - a.createDateTime;
        case "CDON":
          return a.createDateTime - b.createDateTime;
        case "FDCF":
          return new Date(a.deadline) - new Date(b.deadline);
        case "FDFC":
          return new Date(b.deadline) - new Date(a.deadline);
        default:
          break;
      }
    });
    const searchResult = sortedList.filter((todo) => {
      if (findMethod.search === "") {
        return todo;
      } else {
        return todo.content.match(new RegExp(findMethod.search, "gi"));
      }
    });
    setTodoList(searchResult);
  }, [todos, findMethod]);

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
      {tdEditWorkOpen && (
        <EditWork
          status={status}
          allowScroll={allowScroll}
          setTdEditWorkOpen={setTdEditWorkOpen}
        />
      )}
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
            onClick={handleCreateWork}
          >
            <IconSelector name="create" />
          </div>
        </div>

        {todoList && todoList.length > 0 ? (
          <div className="todo-detail-schedule">
            <div className="font-decoration-long"></div>
            <div className="schedule-group">
              <div className="schedule-title center s-text">完成期限</div>
              <div className="schedule-title center s-text">待辦事項</div>
              <div className="schedule-title center s-text">執行日期</div>
              <div className="schedule-title center s-text">實際完成日</div>
              <div></div>
              {todoList.map((todo) => {
                return (
                  <TodoListOne
                    key={todo.id}
                    todo={todo}
                    status={status}
                    setStatus={setStatus}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <EmptyMessage
            message1="查無待辦事項"
            message2="如欲新增，請透過右上方圖示進行"
          />
        )}

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
