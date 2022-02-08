import WeatherLocation from "./WeatherLocation";
import WeatherWeek from "./WeatherWeek";

const Weather = () => {
  return (
    <div className="weather">
      <div>
        <div className="l-text">
          <div>一</div>
          <div>週</div>
          <div>天</div>
          <div>氣</div>
        </div>
        <WeatherLocation />
      </div>
      <WeatherWeek />
    </div>
  );
};

export default Weather;
