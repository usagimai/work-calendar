import { collection, getDocs, query, where } from "firebase/firestore";
import { app, db, auth } from "../firebase-config";

//Action Creator
export const loadProjects = () => async (dispatch) => {
  const user = auth.currentUser;

  if (user) {
    const dbRef = collection(db, "projects");
    const projectQuery = query(dbRef, where("email", "==", user.email));
    const projectData = await getDocs(projectQuery);

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
  }
};
