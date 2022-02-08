import Login from "../components/login/Login";
import bgImg1 from "../img/home-bg-img-1.svg";
import bgImg2 from "../img/home-bg-img-2.svg";

const Home = () => {
  //若已登入，此component return null
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
