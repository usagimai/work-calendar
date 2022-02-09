import { WeatherImgSelector } from "../reusable/WeatherImgSelector";

const WeatherDay = ({ date, iconType, MinT, MaxT }) => {
  //日期後加上星期
  const weekDay = ["日", "一", "二", "三", "四", "五", "六"];
  const DayNum = new Date(date).getDay();
  const day = weekDay[DayNum];

  //選擇顯示的天氣圖示
  const weatherTypes = {
    sun: [1],
    "cloud-sun": [2, 3],
    cloud: [4, 5, 6, 7],
    "cloud-showers-heavy": [
      8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 29, 30, 31, 32, 33, 34,
      35, 36, 37, 38, 39, 40, 41,
    ],
    "cloud-sun-rain": [19, 21],
    snowflake: [23, 42],
    smog: [24, 25, 26, 27, 28],
  };
  const icon = Object.entries(weatherTypes).find((item) =>
    item[1].includes(Number(iconType))
  );

  return (
    <div className="weather-day s-text">
      <div>
        {date} ({day})
      </div>
      <div>{icon && <WeatherImgSelector name={icon[0]} />}</div>
      <div>
        {MinT} - {MaxT}度
      </div>
    </div>
  );
};

export default WeatherDay;
