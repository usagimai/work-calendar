import { validationData } from "../../data";

const AlertMessage = ({ type }) => {
  return (
    <div className="alert-message s-text red-color">
      {type === "alert1" && <div>{validationData.alert1}</div>}
      {type === "alert2" && <div>{validationData.alert2}</div>}
    </div>
  );
};

export default AlertMessage;
