import { collection, getDocs } from "firebase/firestore";
import { app, db } from "../firebase-config";

//Action Creator
export const loadTodos = () => async (dispatch) => {
  const dbRef = collection(db, "todos");
  const todoData = await getDocs(dbRef);
  const todotArr = todoData.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  dispatch({
    type: "FETCH_TODOS",
    payload: {
      all: todotArr,
    },
  });
};
