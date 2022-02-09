import { useState, useEffect, Children } from "react";

import WeatherDay from "./WeatherDay";

const WeatherWeek = ({ currentWeekWeather }) => {
  const [currentWeekWeatherArr, setCurrentWeekWeatherArr] = useState();

  useEffect(() => {
    if (currentWeekWeather) {
      setCurrentWeekWeatherArr(
        Array(7)
          .fill(null)
          .map((item, idx) => ({
            date: currentWeekWeather.dateArr[idx],
            iconType: currentWeekWeather.iconTypeArr[idx],
            MinT: currentWeekWeather.MinTArr[idx],
            MaxT: currentWeekWeather.MaxTArr[idx],
          }))
      );
    }
  }, [currentWeekWeather]);

  return (
    <div className="weather-week">
      {currentWeekWeatherArr &&
        Children.toArray(
          currentWeekWeatherArr.map((item) => {
            return (
              <WeatherDay
                date={item.date}
                iconType={item.iconType}
                MinT={item.MinT}
                MaxT={item.MaxT}
              />
            );
          })
        )}
    </div>
  );
};

export default WeatherWeek;
