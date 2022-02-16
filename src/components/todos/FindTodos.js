import { useState } from "react";

import { IconSelector } from "../reusable/IconSelector";

const FindTodos = ({ findMethod, setFindMethod }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleFindMethod = (e) => {
    switch (e.target.name) {
      case "filter":
        setFindMethod((prevValue) => ({
          ...prevValue,
          filter: e.target.value,
        }));
        break;
      case "sort":
        setFindMethod((prevValue) => ({
          ...prevValue,
          sort: e.target.value,
        }));
        break;
      case "search":
        e.preventDefault();
        setFindMethod((prevValue) => ({
          ...prevValue,
          search: searchInput,
        }));
        break;
    }
  };

  return (
    <div className="project-list-find">
      <div className="m-text">
        <div>篩選</div>
        <select
          className="s-text"
          name="filter"
          value={findMethod.filter}
          onChange={(e) => handleFindMethod(e)}
        >
          <option value="未完成">未完成</option>
          <option value="已完成">已完成</option>
          <option value="全部">全部</option>
        </select>
      </div>
      <div className="m-text">
        <div>排序</div>
        <select
          className="s-text"
          name="sort"
          value={findMethod.sort}
          onChange={(e) => handleFindMethod(e)}
        >
          <option value="CDNO">建立日期新→舊</option>
          <option value="CDON">建立日期舊→新</option>
          <option value="FDCF">完成期限近→遠</option>
          <option value="FDFC">完成期限遠→近</option>
        </select>
      </div>
      <form name="search" onSubmit={(e) => handleFindMethod(e)}>
        <input
          type="search"
          placeholder="搜尋待辦事項"
          value={searchInput}
          className="search-input s-text"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">
          <IconSelector name="search-icon" />
        </button>
      </form>
    </div>
  );
};

export default FindTodos;
