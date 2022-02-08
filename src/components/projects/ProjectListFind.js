import { IconSelector } from "../reusable/IconSelector";

const ProjectListFind = () => {
  return (
    <div className="project-list-find">
      <div className="m-text">
        <div>篩選</div>
        <select className="s-text" name="filter">
          <option>進行中</option>
          <option>已完成</option>
          <option>全部</option>
        </select>
      </div>
      <div className="m-text">
        <div>排序</div>
        <select className="s-text" name="sort">
          <option>建立日期新→舊</option>
          <option>建立日期舊→新</option>
          <option>完成期限近→遠</option>
          <option>完成期限遠→近</option>
          <option>名稱</option>
        </select>
      </div>
      <form>
        <input
          type="search"
          placeholder="搜尋專案"
          className="search-input s-text"
        />
        <button type="submit">
          <IconSelector name="search-icon" />
        </button>
      </form>
    </div>
  );
};

export default ProjectListFind;
