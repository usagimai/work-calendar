import { EditPen } from "../reusable/EditGroup";

const TodoListOne = () => {
  return (
    <>
      <div className="m-text center">2022/02/10</div>
      <div className="m-text">其他待辦事項</div>
      <div className="m-text center edit-color pointer">檢視月曆</div>
      <div className="m-text center">未完成</div>
      <EditPen text="編輯" />
    </>
  );
};

export default TodoListOne;
