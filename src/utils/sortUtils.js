import moment from "moment";

export const sortEvent = (allEvents, filteredProjects, todos) => {
  //排序行事曆每日顯示工作，依當天日期與該工作的完成期限之距離判斷：
  // - 完成期限早於等於執行當天者，對resource push進「1」(排序最前、背景紅色字白色)
  // - 完成期限為執行當天的隔天者，對resource push進「3」(排序第二、背景橘色字白色)
  // - 完成期限為執行當天的兩天後者，對resource push進「5」(排序第三、背景正常字正常)
  const addPriority = [];
  const addPriorityLogic = allEvents.map((event) => {
    const deadline = moment(event.resource[3]);
    const todoDate = moment(event.start).format("YYYY/MM/DD");

    switch (true) {
      case deadline.diff(todoDate, "days") <= 0:
        event.resource.push("1");
        break;
      case deadline.diff(todoDate, "days") === 1:
        event.resource.push("3");
        break;
      default:
        event.resource.push("5");
        break;
    }
    addPriority.push(event);
  });

  // - 已完成之工作，將resource[3]換成「10」(排序最後、背景灰色字灰色)
  //  >專案工作細項
  const finishedWorkID = [];
  const finishedWorks = filteredProjects.map((project) =>
    project.works.map((work) => {
      if (work.finishDate !== "未完成") {
        finishedWorkID.push(work.id);
      }
    })
  );
  //  >待辦事項
  const finishedTodoID = [];
  const finishedTodos = todos.map((todo) => {
    if (todo.finishDate !== "未完成") {
      finishedTodoID.push(todo.id);
    }
  });

  const finishedAllID = [...finishedWorkID, ...finishedTodoID];

  addPriority.map((event) => {
    switch (true) {
      case event.resource[0] === "projects" &&
        finishedAllID.includes(event.resource[2]):
      case event.resource[0] === "todos" &&
        finishedAllID.includes(event.resource[1]):
        return event.resource.splice(4, 1, "10");
      default:
        return event;
    }
  });

  //排序 (先以優先順序代號排，若相同，以執行當天離完成期限近→遠排)
  addPriority.sort((a, b) => {
    if (a.resource[4] !== b.resource[4]) {
      return a.resource[4] - b.resource[4];
    } else {
      return (
        moment(a.resource[3]).diff(
          moment(a.start).format("YYYY/MM/DD"),
          "days"
        ) -
        moment(b.resource[3]).diff(moment(b.start).format("YYYY/MM/DD"), "days")
      );
    }
  });

  return addPriority;
};

export const sortWork = (projectData) => {
  //排序專案工作細項完成期限遠→近
  const sortedWorks = projectData.works.sort((a, b) => {
    return (
      moment(b.deadline).diff(moment(new Date()).format("YYYY/MM/DD"), "days") -
      moment(a.deadline).diff(moment(new Date()).format("YYYY/MM/DD"), "days")
    );
  });

  return sortedWorks;
};

export const sortWorkForm = (formValue) => {
  //排序專案工作細項完成期限遠→近
  const sortedWorksForm = formValue.works.sort((a, b) => {
    return (
      moment(b.deadline).diff(moment(new Date()).format("YYYY/MM/DD"), "days") -
      moment(a.deadline).diff(moment(new Date()).format("YYYY/MM/DD"), "days")
    );
  });

  return sortedWorksForm;
};
