import { collection, getDocs } from "firebase/firestore";
import { app, db } from "../firebase-config";

//Action Creator
export const loadProjects = () => async (dispatch) => {
  const dbRef = collection(db, "projects");
  const projectData = await getDocs(dbRef);
  const projectArr = projectData.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  dispatch({
    type: "FETCH_PROJECTS",
    payload: {
      all: projectArr,
    },
  });
};
