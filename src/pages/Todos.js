import FindTodos from "../components/todos/FindTodos";
import TodoList from "../components/todos/TodoList";

const Todos = () => {
  return (
    <div className="main-frame">
      <FindTodos />
      <TodoList />
    </div>
  );
};

export default Todos;
