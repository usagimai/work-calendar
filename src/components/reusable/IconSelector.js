import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faSearch,
  faPlusSquare,
  faPen,
  faCalendarAlt,
  faTrashAlt,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

export const IconSelector = ({ name }) => {
  switch (name) {
    case "visible":
      return (
        <FontAwesomeIcon
          className="visible"
          icon={faEye}
          size="1x"
          color="#37383C"
        />
      );
    case "unvisible":
      return (
        <FontAwesomeIcon
          className="unvisible"
          icon={faEyeSlash}
          size="1x"
          color="#37383C"
        />
      );
    case "circle-arrow-left":
      return (
        <svg
          width="42"
          height="42"
          viewBox="0 0 45 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M45 22.5C45 34.9264 34.9264 45 22.5 45C10.0736 45 0 34.9264 0 22.5C0 10.0736 10.0736 0 22.5 0C34.9264 0 45 10.0736 45 22.5Z"
            fill="#557174"
          />
          <path
            d="M45 22.5C45 34.9264 34.9264 45 22.5 45C10.0736 45 0 34.9264 0 22.5C0 10.0736 10.0736 0 22.5 0C34.9264 0 45 10.0736 45 22.5Z"
            fill="#557174"
          />
          <path
            d="M16.6857 21.9837L26.1754 12.1929C26.6329 11.7209 27.3751 11.7209 27.8326 12.1929L28.9396 13.335C29.3966 13.8066 29.3971 14.5703 28.9415 15.0429L21.4205 22.8386L28.941 30.6349C29.3971 31.1074 29.3961 31.8712 28.9391 32.3427L27.8321 33.4848C27.3746 33.9569 26.6324 33.9569 26.1749 33.4848L16.6857 23.6936C16.2281 23.2215 16.2281 22.4557 16.6857 21.9837Z"
            fill="#F7F7E8"
          />
        </svg>
      );
    case "circle-arrow-right":
      return (
        <svg
          width="42"
          height="42"
          viewBox="0 0 45 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M45 22.5C45 34.9264 34.9264 45 22.5 45C10.0736 45 0 34.9264 0 22.5C0 10.0736 10.0736 0 22.5 0C34.9264 0 45 10.0736 45 22.5Z"
            fill="#557174"
          />
          <path
            d="M45 22.5C45 34.9264 34.9264 45 22.5 45C10.0736 45 0 34.9264 0 22.5C0 10.0736 10.0736 0 22.5 0C34.9264 0 45 10.0736 45 22.5Z"
            fill="#557174"
          />
          <path
            d="M28.9393 23.3286L19.4498 32.818C18.9922 33.2756 18.2502 33.2756 17.7926 32.818L16.6858 31.7112C16.2289 31.2543 16.228 30.5138 16.6838 30.0558L24.2044 22.4999L16.6838 14.944C16.228 14.486 16.2289 13.7455 16.6858 13.2887L17.7926 12.1819C18.2502 11.7242 18.9922 11.7242 19.4498 12.1819L28.9392 21.6713C29.3969 22.1289 29.3969 22.8709 28.9393 23.3286Z"
            fill="#F7F7E8"
          />
        </svg>
      );
    case "search-icon":
      return (
        <FontAwesomeIcon
          className="search-icon"
          icon={faSearch}
          size="2x"
          color="#557174"
        />
      );
    case "create":
      return (
        <FontAwesomeIcon
          className="create"
          icon={faPlusSquare}
          size="3x"
          color="#557174"
        />
      );
    case "edit":
      return (
        <FontAwesomeIcon
          className="edit"
          icon={faPen}
          size="1x"
          color="#557174"
        />
      );
    case "calendar-icon":
      return (
        <FontAwesomeIcon
          className="calendar-icon"
          icon={faCalendarAlt}
          size="1x"
          color="#557174"
        />
      );
    case "delete":
      return (
        <FontAwesomeIcon
          className="delete"
          icon={faTrashAlt}
          size="2x"
          color="#CC0000"
        />
      );

    case "close":
      return (
        <FontAwesomeIcon
          className="close"
          icon={faTimesCircle}
          size="2x"
          color="black"
        />
      );

    default:
      return null;
  }
};
