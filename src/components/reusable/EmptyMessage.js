const EmptyMessage = ({ message1, message2 }) => {
  return (
    <div className="empty-message">
      <div className="font-decoration-long"></div>
      <div className="s-text">
        <div>{message1}</div>
        <div>{message2}</div>
      </div>
    </div>
  );
};

export default EmptyMessage;
