import { useState, useEffect } from "react";
import axios from "axios";

import WeatherLocation from "./WeatherLocation";
import WeatherWeek from "./WeatherWeek";

const Weather = () => {
  const [weather, setWeather] = useState();
  const [currentWeekWeather, setCurrentWeekWeather] = useState();
  const [city, setCity] = useState();
  const [selectedCity, setSelectedCity] = useState();

  useEffect(() => {
    //預設的城市從local storage讀取，若無資料則使用「臺北市」
    const currentLocation = JSON.parse(localStorage.getItem("weatherLocation"));
    if (currentLocation) {
      setCity(currentLocation);
      setSelectedCity(currentLocation);
    } else {
      setCity("臺北市");
      setSelectedCity("臺北市");
    }
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=${process.env.REACT_APP_WEATHER_API}&locationName=${city}&elementName=MinT,MaxT,Wx`
      )
      .then((data) => {
        setWeather(data.data.records.locations[0].location[0]);
      })
      .catch((err) => console.log(err));
  }, [city]);

  useEffect(() => {
    //將各項資訊整理成Arr (含７天份資料)
    if (weather) {
      const dateOriginal = weather.weatherElement[0].time.map((item) =>
        item.startTime.split(" ")[0].replace(/-/g, "/")
      );
      const dateArray = [...new Set(dateOriginal)].slice(0, 7);

      const iconTypeOriginal = weather.weatherElement[0].time.map(
        (item) => item.elementValue[1].value
      );
      const iconTypeArray = iconTypeOriginal.slice(0, 7);

      const MinTOriginal = weather.weatherElement[1].time.map(
        (item) => item.elementValue[0].value
      );
      const MinTArray = MinTOriginal.slice(0, 7);

      const MaxTOriginal = weather.weatherElement[2].time.map(
        (item) => item.elementValue[0].value
      );
      const MaxTArray = MaxTOriginal.slice(0, 7);

      setCurrentWeekWeather({
        dateArr: dateArray,
        iconTypeArr: iconTypeArray,
        MinTArr: MinTArray,
        MaxTArr: MaxTArray,
      });
    }
  }, [weather]);

  return (
    <div className="weather">
      <div>
        <div className="l-text">
          <div>一</div>
          <div>週</div>
          <div>天</div>
          <div>氣</div>
        </div>
        <WeatherLocation
          setCity={setCity}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      </div>
      <WeatherWeek currentWeekWeather={currentWeekWeather} />
    </div>
  );
};

export default Weather;
