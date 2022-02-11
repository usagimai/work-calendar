import { combineReducers } from "redux";

import projectsReducer from "./projectsReducer";
import todosReducer from "./todosReducer";

const rootReducers = combineReducers({
  projects: projectsReducer,
  todos: todosReducer,
});

export default rootReducers;
