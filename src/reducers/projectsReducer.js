const initState = {
  all: [],
};

const projectsReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_PROJECTS":
      return {
        ...state,
        all: action.payload.all,
      };
    default:
      return { ...state };
  }
};

export default projectsReducer;
