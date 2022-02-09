import { Children } from "react";

const WeatherLocation = ({ setCity, selectedCity, setSelectedCity }) => {
  const cities = [
    "基隆市",
    "臺北市",
    "新北市",
    "桃園市",
    "新竹縣",
    "新竹市",
    "苗栗縣",
    "臺中市",
    "彰化縣",
    "南投縣",
    "雲林縣",
    "嘉義縣",
    "嘉義市",
    "臺南市",
    "高雄市",
    "屏東縣",
    "宜蘭縣",
    "花蓮縣",
    "臺東縣",
    "澎湖縣",
    "金門縣",
    "連江縣",
  ];

  const handleSelectedCity = (e) => {
    setSelectedCity(e.target.value);
    setCity(e.target.value);
    localStorage.setItem("weatherLocation", JSON.stringify(e.target.value));
  };

  return (
    <select
      className="s-text"
      name="location"
      value={selectedCity}
      onChange={handleSelectedCity}
    >
      {Children.toArray(
        cities.map((city) => <option value={city}>{city}</option>)
      )}
    </select>
  );
};

export default WeatherLocation;
