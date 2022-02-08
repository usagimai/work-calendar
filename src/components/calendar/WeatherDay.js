import { WeatherImgSelector } from "../reusable/WeatherImgSelector";

const WeatherDay = () => {
  return (
    <div className="weather-day s-text">
      <div>2022/01/26 (三)</div>
      <div>
        <WeatherImgSelector name="cloud-sun" />
      </div>
      <div>16 - 21度</div>
    </div>
  );
};

export default WeatherDay;
