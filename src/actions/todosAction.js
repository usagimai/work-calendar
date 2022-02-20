import { collection, getDocs, query, where } from "firebase/firestore";
import { app, db, auth } from "../firebase-config";

//Action Creator
export const loadTodos = () => async (dispatch) => {
  const user = auth.currentUser;

  if (user) {
    const dbRef = collection(db, "todos");
    const todoQuery = query(dbRef, where("email", "==", user.email));
    const todoData = await getDocs(todoQuery);

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
  }
};
