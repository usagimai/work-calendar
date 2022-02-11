const initState = {
  all: [],
};

const todosReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_TODOS":
      return {
        ...state,
        all: action.payload.all,
      };
    default:
      return { ...state };
  }
};

export default todosReducer;
