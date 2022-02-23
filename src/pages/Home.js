import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import Login from "../components/login/Login";
import bgImg1 from "../img/home-bg-img-1.svg";
import bgImg2 from "../img/home-bg-img-2.svg";
import { app, auth } from "../firebase-config";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigate("/calendar", { replace: true });
      }
    });
  }, []);

  return (
    <div className="home">
      <div>
        <img className="bg-img-1" src={bgImg1} alt="background image 1" />
        <img className="bg-img-2" src={bgImg2} alt="background image 2" />
      </div>
      <Login />
    </div>
  );
};

export default Home;
