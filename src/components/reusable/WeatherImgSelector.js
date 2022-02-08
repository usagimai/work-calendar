import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloudSun,
  faCloud,
  faCloudShowersHeavy,
  faCloudSunRain,
  faSnowflake,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";

export const WeatherImgSelector = ({ name }) => {
  switch (name) {
    case "sun":
      return (
        <FontAwesomeIcon
          className="sun"
          icon={faSun}
          size="3x"
          color="#9DAD7F"
        />
      );
    case "cloud-sun":
      return (
        <FontAwesomeIcon
          className="cloud-sun"
          icon={faCloudSun}
          size="3x"
          color="#9DAD7F"
        />
      );
    case "cloud":
      return (
        <FontAwesomeIcon
          className="cloud"
          icon={faCloud}
          size="3x"
          color="#9DAD7F"
        />
      );
    case "cloud-showers-heavy":
      return (
        <FontAwesomeIcon
          className="cloud-showers-heavy"
          icon={faCloudShowersHeavy}
          size="3x"
          color="#9DAD7F"
        />
      );
    case "cloud-sun-rain":
      return (
        <FontAwesomeIcon
          className="cloud-sun-rain"
          icon={faCloudSunRain}
          size="3x"
          color="#9DAD7F"
        />
      );
    case "snowflake":
      return (
        <FontAwesomeIcon
          className="snowflake"
          icon={faSnowflake}
          size="3x"
          color="#9DAD7F"
        />
      );
    case "smog":
      return (
        <FontAwesomeIcon
          className="smog"
          icon={faSmog}
          size="3x"
          color="#9DAD7F"
        />
      );
    default:
      return null;
  }
};
